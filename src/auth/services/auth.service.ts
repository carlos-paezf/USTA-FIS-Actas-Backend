import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

import { ConfigServer } from "../../config";
import { UserEntity } from "../../models";
import { RoleModulePermissionService, UserService } from '../../services';
import { ModulePermission, TokenPayload } from "../types/auth.interface";


export class AuthService extends ConfigServer {
    private readonly _roleModulePermissionService: RoleModulePermissionService

    constructor(
        protected readonly _userService: UserService = new UserService(),
        private readonly _jwtInstance = jwt
    ) {
        super()
        this._roleModulePermissionService = new RoleModulePermissionService()
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
    private _sign(
        payload: jwt.JwtPayload,
        secret: string,
        options: jwt.SignOptions = {
            expiresIn: `3h`,
            algorithm: 'HS256'
        }): string {
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

        const modulesPermissionByRole = await this._roleModulePermissionService.findModulesPermissionsByRole(user.role.id)

        const modulesPermissions: ModulePermission[] = []

        for (const modulePermission of modulesPermissionByRole) {
            modulesPermissions.push({ moduleId: modulePermission.module.id, permissionId: modulePermission.permission.id })
        }

        const payload: TokenPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: {
                id: user.role.id,
                roleName: user.role.roleName,
                deletedAt: user.role.deletedAt
            },
            modulesPermissions: modulesPermissions
        }
        /*eslint-disable */
        return {
            accessToken: this._sign(payload, this.getEnvironment(`JWT_SECRET_KEY`)!),
            user
        }
        /*eslint-disable */
    }

    /**
     * It takes a token, verifies it, and returns a promise that resolves to the decoded token payload
     * @param {string} token - The token to verify
     * @returns The decoded token payload.
     */
    public verifyJWT(token: string): Promise<TokenPayload> {
        const verifyOptions: jwt.VerifyOptions = {
            algorithms: ['HS256'],
        }

        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                this.getEnvironment(`JWT_SECRET_KEY`)!,
                verifyOptions,
                (error, decoded) => {
                    return (error) ? reject(error) : resolve(decoded as TokenPayload)
                }
            )
        })
    }
}