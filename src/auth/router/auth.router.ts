import { AuthController } from "../controllers/auth.controller";
import { BaseRouter } from "../../config";
import { AuthMiddleware } from "../../shared/middlewares/auth.middleware";


export class AuthRouter extends BaseRouter<AuthController, AuthMiddleware> {
    constructor() {
        super(AuthController, AuthMiddleware)
    }

    protected routes(): void {
        this.router.post('/login', this.controller.login)

        this.router.post(
            '/register',
            [
                this.middleware.usernameAndEmailValidator,
                this.middleware.validateRoleIsEnabled,
                this.middleware.userValidator
            ],
            this.controller.register
        )

        this.router.get(
            '/renew-token',
            [
                this.middleware.validateJWT
            ],
            this.controller.renewToken
        )

        this.router.get(
            '/validate',
            this.controller.validateExistsEmailOrUsername
        )
    }
}