import { BaseRouter } from "../config";
import { UserController } from "../controllers";
import { UserMiddleware } from "../middlewares";


export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
    constructor() {
        super(UserController, UserMiddleware)
    }

    protected routes(): void {
        this.router.get('/users', this.controller.findUsers)

        this.router.get('/users/:id', this.controller.findOneUserById)

        this.router.post(
            '/users',
            [this.middleware.usernameAndEmailValidator, this.middleware.userValidator,],
            this.controller.createUser
        )

        this.router.put('/users/:id', this.controller.updateUserById)

        this.router.patch(
            '/users/update-username/:id',
            [this.middleware.usernameAndEmailValidator],
            this.controller.updateUsernameById
        )

        this.router.patch(
            '/users/update-email/:id',
            [this.middleware.usernameAndEmailValidator],
            this.controller.updateEmailById
        )

        this.router.patch('/users/update-password/:id', this.controller.updatePasswordById)

        this.router.patch('/users/enabled/:id', this.controller.enableUserById)

        this.router.patch('/users/disabled/:id', this.controller.disableUserById)

        this.router.delete('/users/:id', this.controller.softDeleteUserById)

        this.router.delete('/users/destroy/:id', this.controller.destroyUserById)
    }
}