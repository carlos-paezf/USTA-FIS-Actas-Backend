import { validate } from "class-validator";
import { red } from "colors";
import { NextFunction, Request, Response } from "express";

import { UserDTO } from "../dtos";
import { CustomFieldsHelper } from "../helpers/custom-fields.helper";
import { UserService } from "../services";
import { SharedMiddleware } from '../shared/middlewares/shared.middleware';


/**
 * It validates the user's input and if there are errors, 
 * it returns a bad request response 
 * 
 * @author Carlos Páez
 */
export class UserMiddleware extends SharedMiddleware<UserService> {
    constructor() {
        super(UserService)
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
    public idParamValidator = async (req: Request, res: Response, next: NextFunction, id: string) => {
        try {
            if (req.query.deleted) return next()

            const userExists = await this._service.findOneUserById(id)

            return (userExists) ? next() : this.httpResponse.NotFound(res, `There are no results for the id '${id}'`)
        } catch (error) {
            console.log(red(`Error in UserMiddleware:idParamValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
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
    public idDisabledValidator = async (req: Request, res: Response, next: NextFunction, idDisabled: string) => {
        try {
            const userEnabled = await this._service.userIsEnabled(idDisabled)

            return !userEnabled ? this.httpResponse.PreconditionFailed(res, `The user with the id ${idDisabled} is already disabled`) : next()
        } catch (error) {
            console.log(red(`Error in UserMiddleware:idDisabledValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
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
    public idRestoreValidator = async (req: Request, res: Response, next: NextFunction, idEnabled: string) => {
        try {
            const userEnabled = await this._service.userIsEnabled(idEnabled)

            return userEnabled ? this.httpResponse.PreconditionFailed(res, `The user with the id ${idEnabled} is already enabled`) : next()
        } catch (error) {
            console.log(red(`Error in UserMiddleware:idRestoreValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    /**
     * It validates the email and username fields of the request body and returns a 400 response if there
     * are errors.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @param {NextFunction} next - NextFunction -&gt; This is a function that will be called to pass the
     * request to the next middleware in line.
     */
    public customFieldsValidator = (req: Request, res: Response, next: NextFunction) => {
        const { email, username } = req.body
        const valid = new CustomFieldsHelper()

        valid.email = email
        valid.username = username

        validate(valid).then((error) => {
            return error.length ? this.httpResponse.PreconditionFailed(res, error) : next()
        })
    }

    /**
     * If the username or email is already being used, return a bad request response, otherwise, continue
     * to the next middleware.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @param {NextFunction} next - NextFunction - The next middleware function in the stack.
     * @returns The return value of the next() function.
     */
    public usernameAndEmailValidator = async (req: Request, res: Response, next: NextFunction) => {
        const { username, email } = req.body
        const userByUsername = await this._service.findUserByUsername(username.toUpperCase())
        const userByEmail = await this._service.findUserByEmail(email.toUpperCase())

        if (userByUsername) {
            return this.httpResponse.BadRequest(res, `The username '${username}' is already being used`)
        }
        if (userByEmail) {
            return this.httpResponse.BadRequest(res, `The email '${email}' is already being used`)
        }

        return next()
    }

    /**
     * It validates the user's input and if there are errors, it returns a bad request response.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - Express response object
     * @param {NextFunction} next - NextFunction - The next middleware function in the stack.
     */
    public userValidator = (req: Request, res: Response, next: NextFunction) => {
        const { name, lastName, username, email, password, position, role } = req.body

        const valid = new UserDTO()

        valid.name = name
        valid.lastName = lastName
        valid.username = username
        valid.email = email
        valid.password = password
        valid.position = position
        valid.role = role

        validate(valid).then((error) => {
            return error.length ? this.httpResponse.PreconditionFailed(res, error) : next()
        })
    }
}
