import { Request, Response } from "express"
import { DeleteResult, UpdateResult } from "typeorm";
import { red } from 'colors';

import { UserService } from "../services"
import { BaseController } from "../config";


/**
 * The `UserController` class is a class that contains methods that are used to 
 * perform CRUD operations on the `UserEntity` class 
 * 
 * @author Carlos Páez
 */
export class UserController extends BaseController<UserService> {
    constructor() {
        super(UserService)
    }

    public findUsers = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { from = 0, limit = 10, all = false, order = 'ASC' } = req.query

            const [data, totalCount] = await this._service.findUsers(
                Number(from),
                Number(limit),
                Boolean(all),
                String(order).toUpperCase()
            )
            if (!data.length) return this._httpResponse.NotFound(res, `There are no results for the search`)

            return this._httpResponse.Ok(res, {
                from, limit, all, order,
                partialCount: data.length, totalCount,
                data
            })
        } catch (error) {
            console.log(red(`Error in UserController:findUsers: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findOneUserById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params
            const { deleted } = req.query

            const data = deleted
                ? await this._service.findOneUserByIdIncludeDeleted(id)
                : await this._service.findOneUserById(id)

            if (!data) return this._httpResponse.NotFound(res, `There are no results for the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in UserController:findOneUserById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public createUser = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const data = await this._service.createUser({ ...req.body })

            return this._httpResponse.Created(res, data)
        } catch (error) {
            console.log(red(`Error in UserController:createUser: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public updateUserById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params
            const { email, username, password, ...infoUpdate } = req.body
            const data: UpdateResult = await this._service.updateUserById(id, { ...infoUpdate })

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in UserController:updateUserById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public updateUsernameById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params
            const { username } = req.body
            const data: UpdateResult = await this._service.updateUsernameById(id, username)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in UserController:updateUsername: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public updateEmailById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params
            const { email } = req.body
            const data: UpdateResult = await this._service.updateEmailById(id, email)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in UserController:updateEmail: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public updatePasswordById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params
            const { password } = req.body
            const data: UpdateResult = await this._service.updatePasswordById(id, password)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in UserController:updatePassword: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public softDeleteUserById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { idDisabled } = req.params
            const data: DeleteResult = await this._service.softDeleteUserById(idDisabled)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to remove the id '${idDisabled}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in UserController:deleteUser: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public restoreUserById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { idRestore } = req.params
            const data: UpdateResult = await this._service.restoreUserById(idRestore)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to restore the id '${idRestore}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in UserController:restoreUserById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public destroyUserById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { idDestroy } = req.params
            const data: DeleteResult = await this._service.destroyUserById(idDestroy)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to destroy the id '${idDestroy}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in UserController:deleteUser: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}