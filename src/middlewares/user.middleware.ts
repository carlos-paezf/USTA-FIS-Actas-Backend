import { validate } from "class-validator"
import { red } from "colors"
import { NextFunction, Request, Response } from "express"

import { CustomFieldsHelper } from "../helpers/custom-fields.helper"
import { RoleService, UserService } from "../services"
import { SharedMiddleware } from '../shared/middlewares/shared.middleware'


const _roleService = new RoleService()
/**
 * It validates the user's input and if there are errors, 
 * it returns a bad request response 
 * 
 * @author Carlos Páez
 */
export class UserMiddleware extends SharedMiddleware<UserService> {
    constructor () {
        super( UserService )
    }

    /**
     * If the user exists, then call the next function, otherwise return a 404 response.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response
     * @param {NextFunction} next - NextFunction -&gt; This is a function that is called when the
     * middleware is done.
     * @param {string} id - string -&gt; the id that is passed in the url
     * @returns The return is a function that is being called with the parameters: req, res, next, id
     */
    public idParamValidator = async ( req: Request, res: Response, next: NextFunction, id: string ) => {
        try {
            if ( req.query.deleted ) return next()

            const userExists = await this._service.findOneUserById( id )

            return ( userExists ) ? next() : this.httpResponse.NotFound( res, `There are no results for the id '${ id }'` )
        } catch ( error ) {
            console.log( red( `Error in UserMiddleware:idParamValidator: ` ), error )
            return this.httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * If the user is already disabled, return a bad request response, otherwise, continue to the next
     * middleware function.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @param {NextFunction} next - NextFunction -&gt; This is a function that will be called when the
     * middleware is done.
     * @param {string} idDisabled - string -&gt; The id of the user that is going to be disabled
     * @returns the result of the next() function.
     */
    public idDisabledValidator = async ( req: Request, res: Response, next: NextFunction, idDisabled: string ) => {
        try {
            const userEnabled = await this._service.userIsEnabled( idDisabled )

            return !userEnabled ? this.httpResponse.PreconditionFailed( res, `The user with the id ${ idDisabled } is already disabled` ) : next()
        } catch ( error ) {
            console.log( red( `Error in UserMiddleware:idDisabledValidator: ` ), error )
            return this.httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * If the user is already enabled, return a bad request response, otherwise, continue to the next
     * middleware function.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @param {NextFunction} next - NextFunction -&gt; This is a function that will be called when the
     * middleware is done.
     * @param {string} idEnabled - string -&gt; The id of the user that is going to be disabled
     * @returns the result of the next() function.
     */
    public idRestoreValidator = async ( req: Request, res: Response, next: NextFunction, idEnabled: string ) => {
        try {
            const userEnabled = await this._service.userIsEnabled( idEnabled )

            return userEnabled ? this.httpResponse.PreconditionFailed( res, `The user with the id ${ idEnabled } is already enabled` ) : next()
        } catch ( error ) {
            console.log( red( `Error in UserMiddleware:idRestoreValidator: ` ), error )
            return this.httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * It validates the email field of the request body and returns a 400 response if there
     * are errors.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @param {NextFunction} next - NextFunction -&gt; This is a function that will be called to pass the
     * request to the next middleware in line.
     */
    public updateEmailValidator = ( req: Request, res: Response, next: NextFunction ) => {
        const { email } = req.body
        if ( !email ) return this.httpResponse.PreconditionFailed( res, `No email provided` )

        const valid = new CustomFieldsHelper()

        valid.email = email

        validate( valid ).then( ( error ) => {
            return error.length ? this.httpResponse.PreconditionFailed( res, error ) : next()
        } )
    }

    /**
     * It validates the username field of the request body and returns a 400 response if there
     * are errors.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @param {NextFunction} next - NextFunction -&gt; This is a function that will be called to pass the
     * request to the next middleware in line.
     */
    public updateUsernameValidator = ( req: Request, res: Response, next: NextFunction ) => {
        const { username } = req.body
        if ( !username ) return this.httpResponse.PreconditionFailed( res, `No username provided` )

        const valid = new CustomFieldsHelper()

        valid.username = username

        validate( valid ).then( ( error ) => {
            return error.length ? this.httpResponse.PreconditionFailed( res, error ) : next()
        } )
    }

    /**
     * It validates the role field of the request body and returns a 400 response if there
     * are errors.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @param {NextFunction} next - NextFunction -&gt; This is a function that will be called to pass the
     * request to the next middleware in line.
     */
    public updateRoleValidator = async ( req: Request, res: Response, next: NextFunction ) => {
        const { role } = req.body
        if ( !role ) return this.httpResponse.PreconditionFailed( res, `No role provided` )

        const roleQuery = await _roleService.findOneRoleById( role )
        if ( !roleQuery ) return this.httpResponse.BadRequest( res, `There is no role with the id '${ role }'` )

        const valid = new CustomFieldsHelper()
        valid.role = role

        validate( valid ).then( ( error ) => {
            return error.length ? this.httpResponse.PreconditionFailed( res, error ) : next()
        } )
    }
}
