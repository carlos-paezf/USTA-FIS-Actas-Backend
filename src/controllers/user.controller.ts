import { Request, Response } from "express"
import { DeleteResult, UpdateResult } from "typeorm"
import { red } from 'colors'

import { UserService } from "../services"
import { BaseController } from "../config"
import { RolesID } from "../helpers/enums.helper"


/**
 * The `UserController` class is a class that contains methods that are used to 
 * perform CRUD operations on the `UserEntity` class 
 * 
 * @author Carlos Páez
 */
export class UserController extends BaseController<UserService> {
    constructor () {
        super( UserService )
    }

    /**
     * Method to obtain registered users in the database
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express Response object
     * @returns An object with the sent values of from, limit, all, order, the number of 
     * records returned by the query, the total number of records, and the array of users
     */
    public findUsers = async ( req: Request, res: Response ): Promise<unknown> => {
        try {
            const { from = 0, limit = 10, all = false, order = 'ASC' } = req.query

            const [ data, totalCount ] = await this._service.findUsers(
                Number( from ),
                Number( limit ),
                Boolean( all ),
                String( order ).toUpperCase()
            )
            if ( !data.length ) return this._httpResponse.NotFound( res, `There are no results for the search` )

            return this._httpResponse.Ok( res, {
                from, limit, all, order,
                partialCount: data.length, totalCount,
                data
            } )
        } catch ( error ) {
            console.log( red( `Error in UserController:findUsers: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * Find a user by its id (records that were deleted with soft-delete can also be obtained)
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express Response object
     * @returns The user record that matches the id
     */
    public findOneUserById = async ( req: Request, res: Response ): Promise<unknown> => {
        try {
            const { id } = req.params
            const { deleted } = req.query

            const data = deleted
                ? await this._service.findOneUserByIdIncludeDeleted( id )
                : await this._service.findOneUserById( id )

            if ( !data ) return this._httpResponse.NotFound( res, `There are no results for the id '${ id }'` )

            return this._httpResponse.Ok( res, data )
        } catch ( error ) {
            console.log( red( `Error in UserController:findOneUserById: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * Adding a user to the database
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express Response object
     * @returns An object with the embedded information
     */
    public createUser = async ( req: Request, res: Response ): Promise<unknown> => {
        try {
            const user = req.body
            user.role = user.role ?? RolesID.GUEST

            const data = await this._service.createUser( { ...user } )

            return this._httpResponse.Created( res, data )
        } catch ( error ) {
            console.log( red( `Error in UserController:createUser: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * Update a user by their id, except for the `email`, `username`, and `password` fields
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express Response object
     * @returns An object with the number of affected rows
     */
    public updateUserById = async ( req: Request, res: Response ): Promise<unknown> => {
        try {
            const { id } = req.params
            const { email, username, password, role, ...infoUpdate } = req.body
            const data: UpdateResult = await this._service.updateUserById( id, { ...infoUpdate } )

            if ( !data.affected ) return this._httpResponse.BadRequest( res, `Changes have not been applied` )

            return this._httpResponse.Ok( res, data )
        } catch ( error ) {
            console.log( red( `Error in UserController:updateUserById: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * Update the `username` field of the user that matches the id
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express Response object
     * @returns An object with the number of affected rows
     */
    public updateUsernameById = async ( req: Request, res: Response ): Promise<unknown> => {
        try {
            const { id } = req.params
            const { username } = req.body
            const data: UpdateResult = await this._service.updateUsernameById( id, username )

            if ( !data.affected ) return this._httpResponse.BadRequest( res, `Changes have not been applied` )

            return this._httpResponse.Ok( res, data )
        } catch ( error ) {
            console.log( red( `Error in UserController:updateUsername: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * Update the `email` field of the user that matches the id
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express Response object
     * @returns An object with the number of affected rows
     */
    public updateEmailById = async ( req: Request, res: Response ): Promise<unknown> => {
        try {
            const { id } = req.params
            const { email } = req.body
            const data: UpdateResult = await this._service.updateEmailById( id, email )

            if ( !data.affected ) return this._httpResponse.BadRequest( res, `Changes have not been applied` )

            return this._httpResponse.Ok( res, data )
        } catch ( error ) {
            console.log( red( `Error in UserController:updateEmailById: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * Update the `rol` field of the user that matches the id
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express Response object
     * @returns An object with the number of affected rows
     */
    public updateUserRoleById = async ( req: Request, res: Response ): Promise<unknown> => {
        try {
            const { id } = req.params
            const { role } = req.body
            const data: UpdateResult = await this._service.updateUserRoleById( id, role )

            if ( !data.affected ) return this._httpResponse.BadRequest( res, `Changes have not been applied` )

            return this._httpResponse.Ok( res, data )
        } catch ( error ) {
            console.log( red( `Error in UserController:updateUserRoleById: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * Update the `password` field of the user that matches the id
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express Response object
     * @returns An object with the number of affected rows
     */
    public updatePasswordById = async ( req: Request, res: Response ): Promise<unknown> => {
        try {
            const { id } = req.params
            const { password } = req.body
            const data: UpdateResult = await this._service.updatePasswordById( id, password )

            if ( !data.affected ) return this._httpResponse.BadRequest( res, `Changes have not been applied` )

            return this._httpResponse.Ok( res, data )
        } catch ( error ) {
            console.log( red( `Error in UserController:updatePassword: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * Logically delete a user record by its id, in order to maintain referential integrity
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express Response object
     * @returns An object with the number of affected rows
     */
    public softDeleteUserById = async ( req: Request, res: Response ): Promise<unknown> => {
        try {
            const { idDisabled } = req.params
            const data: DeleteResult = await this._service.softDeleteUserById( idDisabled )

            if ( !data.affected ) return this._httpResponse.BadRequest( res, `Unable to remove the id '${ idDisabled }'` )

            return this._httpResponse.Ok( res, data )
        } catch ( error ) {
            console.log( red( `Error in UserController:deleteUser: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * Restore a user record that has been marked as deleted
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express Response object
     * @returns An object with the number of affected rows
     */
    public restoreUserById = async ( req: Request, res: Response ): Promise<unknown> => {
        try {
            const { idRestore } = req.params
            const data: UpdateResult = await this._service.restoreUserById( idRestore )

            if ( !data.affected ) return this._httpResponse.BadRequest( res, `Unable to restore the id '${ idRestore }'` )

            return this._httpResponse.Ok( res, data )
        } catch ( error ) {
            console.log( red( `Error in UserController:restoreUserById: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * Destroy a record beyond restoration
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express Response object
     * @returns An object with the number of affected rows
     */
    public destroyUserById = async ( req: Request, res: Response ): Promise<unknown> => {
        try {
            const { idDestroy } = req.params
            const data: DeleteResult = await this._service.destroyUserById( idDestroy )

            if ( !data.affected ) return this._httpResponse.BadRequest( res, `Unable to destroy the id '${ idDestroy }'` )

            return this._httpResponse.Ok( res, data )
        } catch ( error ) {
            console.log( red( `Error in UserController:deleteUser: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }
}