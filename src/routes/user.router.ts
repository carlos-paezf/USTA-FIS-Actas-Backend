import { BaseRouter } from "../config";
import { UserController } from "../controllers";
import { UserMiddleware } from "../middlewares";


export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
    constructor() {
        super(UserController, UserMiddleware)
    }

    protected routes(): void {
        this.router.param('id', this.middleware.idParamValidator)

        this.router.get('/users', this.controller.findUsers)

        this.router.get('/users/:id', this.controller.findOneUserById)

        this.router.post(
            '/users',
            [
                this.middleware.usernameAndEmailValidator,
                this.middleware.validateRoleIsEnabled,
                this.middleware.userValidator
            ],
            this.controller.createUser
        )

        this.router.put(
            '/users/:id',
            [this.middleware.validateRoleIsEnabled, this.middleware.userValidator],
            this.controller.updateUserById
        )

        this.router.patch(
            '/users/update-username/:id',
            [this.middleware.usernameAndEmailValidator, this.middleware.customFieldsValidator],
            this.controller.updateUsernameById
        )

        this.router.patch(
            '/users/update-email/:id',
            [this.middleware.usernameAndEmailValidator, this.middleware.customFieldsValidator],
            this.controller.updateEmailById
        )

        this.router.patch('/users/update-password/:id', this.controller.updatePasswordById)

        this.router.param('idDisabled', this.middleware.idDisabledValidator)

        this.router.patch('/users/disabled/:idDisabled', this.controller.softDeleteUserById)

        this.router.param('idRestore', this.middleware.idRestoreValidator)

        this.router.patch('/users/restore/:idRestore', this.controller.restoreUserById)

        this.router.delete('/users/destroy/:idDestroy', this.controller.destroyUserById)
    }
}