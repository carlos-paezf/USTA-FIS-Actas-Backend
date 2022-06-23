import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

import { ConfigServer } from "../../config";
import { UserEntity } from "../../models";
import { UserService } from '../../services';
import { PayloadToken } from "../types/auth.interface";


export class AuthService extends ConfigServer {
    constructor(
        private readonly _userService: UserService = new UserService(),
        private readonly _jwtInstance = jwt
    ) {
        super()
    }

    /**
     * If the user exists, compare the password to the hash, and if it matches, return the user.
     * @param {string} emailOrUsername - string - The email or username of the user
     * @param {string} password - string - The password to validate
     * @returns The return type is a Promise of UserEntity or null.
     */
    public async validateUser(emailOrUsername: string, password: string): Promise<UserEntity | null> {
        const userByEmail = await this._userService.findUserByEmail(emailOrUsername)
        const userByUsername = await this._userService.findUserByUsername(emailOrUsername)

        if (userByEmail) {
            const isMatch = await compare(password, userByEmail.password)
            if (isMatch) return userByEmail
        }

        if (userByUsername) {
            const isMatch = await compare(password, userByUsername.password)
            if (isMatch) return userByUsername
        }

        return null
    }

    /**
     * This function takes a payload and a secret and returns a signed JWT.
     * @param payload - The payload to be signed.
     * @param {string} secret - The secret key used to sign the token.
     * @returns A JWT token
     */
    private _sign(payload: jwt.JwtPayload, secret: string, options = { expiresIn: `3h` }): string {
        return this._jwtInstance.sign(payload, secret, options)
    }

    /**
     * It takes a user object, finds the user in the database, and then returns a JWT token
     * @param {UserEntity} user - UserEntity - this is the user object that is returned from the
     * database.
     * @returns An object with two properties: accessToken and user.
     */
    public async generateJWT(userId: string): Promise<{ accessToken: string, user: UserEntity } | null> {
        const user = await this._userService.findOneUserById(userId)

        if (!user) return null
        else user.password = 'Not Permission'

        const payload: PayloadToken = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role.id,
            roleName: user.role.roleName
        }

        return {
            accessToken: this._sign(payload, this.getEnvironment(`JWT_SECRET_KEY`)!),
            user
        }
    }

    public verifyJWT(token: string) {
        return jwt.verify(token, this.getEnvironment(`JWT_SECRET_KEY`)!)
    }
}