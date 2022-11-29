import passport from 'passport'
import { NextFunction, Request, Response } from 'express'

import { HttpResponse } from "../response/http.response"
import { UserEntity } from '../../models'
import { RoleService, UserService } from '../../services'
import { RolesID } from '../../helpers/enums.helper'
import { UserDTO } from '../../dtos'
import { validate } from 'class-validator'
import { red } from 'colors'
import { AuthService } from '../../auth/services/auth.service'
import { ModulePermission, TokenPayload } from '../../auth/types/auth.interface'
import { CustomFieldsHelper } from '../../helpers/custom-fields.helper'


export class AuthMiddleware {
    private readonly _authService: AuthService
    private readonly _roleService: RoleService
    private readonly _userService: UserService

    constructor ( protected readonly httpResponse: HttpResponse = new HttpResponse() ) {
        this._authService = new AuthService()
        this._roleService = new RoleService()
        this._userService = new UserService()
    }

    /**
     * If the role is not enabled, return a precondition failed response, otherwise, call the next function
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - this is the response object that is passed to the middleware
     * @param {NextFunction} next - NextFunction -&gt; This is a function that is used to call the next
     * middleware in the chain.
     * @returns the result of the next() function.
     */
    public validateRoleIsEnabled = async ( req: Request, res: Response, next: NextFunction ) => {
        try {
            const { role } = req.body
            const roleEnabled = await this._roleService.roleIsEnabled( role )

            return ( !roleEnabled )
                ? this.httpResponse.PreconditionFailed( res, `Role with id ${ role } is disabled or has been removed` )
                : next()
        } catch ( error ) {
            console.log( red( `Error in SharedMiddleware:validateRoleIsEnabled: ` ), error )
            return this.httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * This is a function that is used to authenticate the user.
     * @param {string} type - The type of authentication you want to use.
     * @returns A function that takes a type and returns a function that takes a request and response
     * and returns a function that takes an error, user, and info.
     */
    public passAuth = ( type: string ) => {
        return passport.authenticate( type, { session: true } )
    }

    /**
     * It checks if the user has the permission to access the module
     * @param {string} moduleId - string - The module id that you want to check
     * @param {string} permissionId - string - This is the permission id that you want to check for.
     * @returns A function that takes in a Request, Response, and NextFunction.
     */
    public checkRoleModulePermission = ( moduleId: string, permissionId: string ) =>
        async ( req: Request, res: Response, next: NextFunction ) => {
            try {
                const user = req.user as TokenPayload

                if ( user.role.deletedAt !== null ) {
                    return this.httpResponse.Forbidden( res, `You do not have permission to access` )
                }

                /* const userQuery = await _roleModulePermissionService.validateRoleModulePermissionForJWT(user.role.id, moduleId, permissionId)
                if (!userQuery) {
                    return this.httpResponse.Unauthorized(res, `You do not have permission to access`)
                } */

                const userQuery: ModulePermission[] = []

                for ( const modPer of user.modulesPermissions ) {
                    if ( modPer.moduleId === moduleId && modPer.permissionId === permissionId ) {
                        userQuery.push( modPer )
                    }
                }

                if ( !userQuery || !userQuery.length ) {
                    return this.httpResponse.Forbidden( res, `You do not have permission to access` )
                }

                next()
            } catch ( error ) {
                console.log( red( `Error un AuthMiddleware:checkRoleModulePermission: ` ), error )
                return this.httpResponse.InternalServerError( res, error )
            }
        }

    /**
     * If the user's role is Dean or Developer, then allow them to continue to the next function.
     * Otherwise, send an Unauthorized response.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - this is the response object that will be sent back to the
     * client.
     * @param {NextFunction} next - NextFunction -&gt; This is a function that will be called when the
     * middleware is done.
     * @returns A boolean value.
     */
    public checkAdminRole = async ( req: Request, res: Response, next: NextFunction ) => {
        const user = req.user as UserEntity

        if ( !user ) return this.httpResponse.Forbidden( res, `You do not have permission to access` )

        return ( user.role.id === RolesID.DEAN )
            ? next()
            : ( user.role.id === RolesID.DEVELOPER )
                ? next()
                : this.httpResponse.Forbidden( res, `You do not have permission to access` )
    }

    /**
     * If the username or email is already being used, return a bad request response, otherwise, continue
     * to the next middleware.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @param {NextFunction} next - NextFunction - The next middleware function in the stack.
     * @returns The return value of the next() function.
     */
    public usernameAndEmailValidator = async ( req: Request, res: Response, next: NextFunction ) => {
        const { username, email } = req.body
        if ( username ) {
            const userByUsername = await this._userService.findUserByUsername( username.toUpperCase() )

            if ( userByUsername ) {
                return this.httpResponse.BadRequest( res, `The username '${ username }' is already being used` )
            }
        }

        if ( email ) {
            const userByEmail = await this._userService.findUserByEmail( email.toUpperCase() )

            if ( userByEmail ) {
                return this.httpResponse.BadRequest( res, `The email '${ email }' is already being used` )
            }
        }

        return next()
    }

    /**
     * It validates the user's input and if there are errors, it returns a bad request response.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - Express response object
     * @param {NextFunction} next - NextFunction - The next middleware function in the stack.
     */
    public userValidator = ( req: Request, res: Response, next: NextFunction ) => {
        const { name, lastName, username, email, position, role } = req.body

        const valid = new CustomFieldsHelper()

        valid.name = name
        valid.lastName = lastName
        valid.username = username
        valid.email = email
        valid.position = position
        valid.role = role

        validate( valid ).then( ( error ) => {
            return error.length ? this.httpResponse.PreconditionFailed( res, error ) : next()
        } )
    }

    /**
     * It takes a JWT from the request header, verifies it, and then adds the payload to the request object
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - the response object
     * @param {NextFunction} next - NextFunction
     * @returns The function validateJWT is being returned.
     */
    public validateJWT = async ( req: Request, res: Response, next: NextFunction ) => {
        try {
            let jwt = req.headers.authorization
            if ( !jwt ) return this.httpResponse.Unauthorized( res, `Token not found` )

            try {
                if ( jwt.toLocaleLowerCase().startsWith( 'bearer' ) ) {
                    jwt = jwt.slice( 'bearer'.length ).trim()
                }
                if ( !jwt ) return this.httpResponse.Unauthorized( res, `Token Not Found` )

                const payload = await this._authService.verifyJWT( jwt ) as TokenPayload

                req.user = payload
                next()
                // eslint-disable-next-line
            } catch ( error: any ) {
                if ( error.name === 'TokenExpiredError' ) return this.httpResponse.Unauthorized( res, `Expired JWT` )

                // console.log(red(`Error un AuthMiddleware: validateJWT: `), error)
                return this.httpResponse.BadRequest( res, error )
            }
        } catch ( error ) {
            console.log( red( `Error un AuthMiddleware: validateJWT: ` ), error )
            return this.httpResponse.InternalServerError( res, error )
        }
    }
}
