import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

import { UserDTO } from "../dtos";
import { UserService } from "../services";
import { SharedMiddleware } from '../shared/middlewares/shared.middleware';


export class UserMiddleware extends SharedMiddleware {

    constructor(private _userService: UserService = new UserService()) {
        super()
    }

    public usernameAndEmailValidator = async (req: Request, res: Response, next: NextFunction) => {
        const { username, email } = req.body
        const userByUsername = await this._userService.findUserByUsername(username)
        const userByEmail = await this._userService.findUserByEmail(email)

        if (userByUsername) {
            return this.httpResponse.BadRequest(res, `The username '${username}' is already being used`)
        }
        if (userByEmail) {
            return this.httpResponse.BadRequest(res, `The email '${email}' is already being used`)
        }

        return next()
    }

    public userValidator = (req: Request, res: Response, next: NextFunction) => {
        const { name, lastName, username, email, password, role } = req.body

        const valid = new UserDTO()

        valid.name = name
        valid.lastName = lastName
        valid.username = username
        valid.email = email
        valid.password = password
        valid.role = role

        validate(valid).then((error) => {
            return error.length ? this.httpResponse.BadRequest(res, error) : next()
        })
    }
}