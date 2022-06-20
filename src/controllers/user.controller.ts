import { Request, Response } from "express"
import { DeleteResult, UpdateResult } from "typeorm";
import { red } from 'colors';

import { HttpResponse } from "../shared/response/http.response"
import { UserService } from "../services"


/**
 * The `UserController` class is a class that contains methods that are used to 
 * perform CRUD operations on the `UserEntity` class 
 * 
 * @author Carlos Páez
 */
export class UserController {
    constructor(
        private readonly _userService: UserService = new UserService(),
        private readonly _httpResponse: HttpResponse = new HttpResponse()
    ) { }

    public findAllUsers = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const data = await this._userService.findAllUsers()

            if (!data.length) return this._httpResponse.NotFound(res, `There are no results for the search`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in UserController:findAllUsers: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findOneUserById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params
            const data = await this._userService.findOneUserById(id)

            if (!data) return this._httpResponse.NotFound(res, `There are no results for the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in UserController:findOneUserById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public createUser = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const data = await this._userService.createUser({ ...req.body })

            return this._httpResponse.Created(res, data)
        } catch (error) {
            console.log(red(`Error in UserController:createUser: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public updateUserById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params
            const data: UpdateResult = await this._userService.updateUserById(id, { ...req.body })

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in UserController:updateUser: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public destroyUserById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params
            const data: DeleteResult = await this._userService.destroyUserById(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to remove the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in UserController:deleteUser: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public deleteUserById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params
            const data: DeleteResult = await this._userService.destroyUserById(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to remove the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in UserController:deleteUser: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}