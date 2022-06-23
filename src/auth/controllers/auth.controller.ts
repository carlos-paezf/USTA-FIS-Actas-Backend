import { red } from "colors";
import { Request, Response } from "express";

import { UserEntity } from "../../models";
import { UserService } from "../../services";
import { HttpResponse } from "../../shared/response/http.response";
import { AuthService } from "../services/auth.service";
import { RolesID } from "../../helpers/enums.helper";


const _userService: UserService = new UserService()

export class AuthController extends AuthService {
    constructor(private readonly _httpResponse: HttpResponse = new HttpResponse()) {
        super()
    }

    /**
     * This function saves the user and JWT in the request.
     * @param {UserEntity} user - UserEntity =&gt; UserEntity is a class that extends the User class from
     * the typeorm library
     * @param {Request} req - Request =&gt; is the request object
     * @param {Response} res - Response
     * @returns the result of the function call.
     */
    private _saveUserAndJWTInRequest = async (user: UserEntity, req: Request, res: Response) => {
        try {
            const encode = await this.generateJWT(user.id)
            if (!encode) return this._httpResponse.Unauthorized(res, `You do not have permission to access`)

            req.user = encode.user

            req.header('Au')

            res.header('Content-Type', 'application/json')
            res.cookie('accesToken', encode.accessToken, { maxAge: 10800000 })
            res.write(JSON.stringify(encode))
            res.end()
        } catch (error) {
            console.log(red(`Error in AuthController:_saveUserAndJWTInRequest: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    /**
     * It takes a user object, generates a JWT, and then sets the JWT as a cookie on the response
     * object.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - the response object
     * @returns The accessToken is being returned.
     */
    public login = async (req: Request, res: Response) => {
        try {
            const emailOrUsername = req.body.email ?? req.body.username

            const user = await this.validateUser(emailOrUsername, req.body.password)
            if (!user) return this._httpResponse.BadRequest(res, `Invalid email/username or password`)

            return await this._saveUserAndJWTInRequest(user, req, res)
        } catch (error) {
            console.log(red(`Error in AuthController:login: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    /**
     * This function creates a user, sends a response to the client, and then saves the user and JWT in the
     * request.
     * @param {Request} req - Request
     * @param {Response} res - Response =&gt; Express.Response
     * @returns The user object
     */
    public register = async (req: Request, res: Response) => {
        try {
            const data = req.body
            data.role = RolesID.GUEST

            const user = await _userService.createUser({ ...data })

            this._httpResponse.Created(res, user)

            // TODO: Emitir un socket para alertar la creación de un usuario, y lograr cambiar su rol en caso necesario

            return await this._saveUserAndJWTInRequest(user, req, res)
        } catch (error) {
            console.log(red(`Error in AuthController:register: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    /**
     * If the user is found in the request, save the user and JWT in the request.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express.Response
     * @returns The user and the JWT token
     */
    public renewToken = async (req: Request, res: Response) => {
        try {
            const user = req.user as UserEntity
            if (!user) return this._httpResponse.NotFound(res, `No user found in the request`)

            return await this._saveUserAndJWTInRequest(user, req, res)
        } catch (error) {
            console.log(red(`Error un AuthController:renewToken`), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}