import { BaseRouter } from "../config"
import { UserController } from "../controllers"
import { ModulesID, PermissionsID } from "../helpers/enums.helper"
import { UserMiddleware } from "../middlewares"


export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
    constructor () {
        super( UserController, UserMiddleware )
    }

    protected routes (): void {
        this.router.param( 'id', this.middleware.idParamValidator )

        this.router.get(
            '/users',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission( ModulesID.USERS, PermissionsID.READ )
            ],
            this.controller.findUsers
        )

        this.router.get(
            '/users/:id',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission( ModulesID.USERS, PermissionsID.READ )
            ],
            this.controller.findOneUserById
        )

        this.router.get(
            '/users/profile/:id',
            [
                this.middleware.validateJWT
            ],
            this.controller.findOneUserById
        )

        this.router.post(
            '/users',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission( ModulesID.USERS, PermissionsID.CREATE ),
                this.middleware.usernameAndEmailValidator,
                this.middleware.validateRoleIsEnabled,
                this.middleware.userValidator
            ],
            this.controller.createUser
        )

        this.router.put(
            '/users/:id',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission( ModulesID.USERS, PermissionsID.UPDATE ),
                // this.middleware.validateRoleIsEnabled,
                this.middleware.userValidator
            ],
            this.controller.updateUserById
        )

        this.router.put(
            '/users/profile:id',
            [
                this.middleware.validateJWT,
                this.middleware.validateRoleIsEnabled,
                this.middleware.userValidator
            ],
            this.controller.updateUserById
        )

        this.router.patch(
            '/users/update-username/:id',
            [
                this.middleware.validateJWT,
                this.middleware.usernameAndEmailValidator,
                this.middleware.updateUsernameValidator
            ],
            this.controller.updateUsernameById
        )

        this.router.patch(
            '/users/update-email/:id',
            [
                this.middleware.validateJWT,
                this.middleware.usernameAndEmailValidator,
                this.middleware.updateEmailValidator
            ],
            this.controller.updateEmailById
        )

        this.router.patch(
            '/users/update-password/:id',
            [
                this.middleware.validateJWT
            ],
            this.controller.updatePasswordById
        )

        this.router.patch(
            '/users/update-role/:id',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission( ModulesID.USERS, PermissionsID.UPDATE ),
                this.middleware.updateRoleValidator
            ],
            this.controller.updateUserRoleById
        )

        this.router.param( 'idDisabled', this.middleware.idDisabledValidator )

        this.router.patch(
            '/users/disabled/:idDisabled',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission( ModulesID.USERS, PermissionsID.SOFT_DELETE )
            ],
            this.controller.softDeleteUserById
        )

        this.router.param( 'idRestore', this.middleware.idRestoreValidator )

        this.router.patch(
            '/users/restore/:idRestore',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission( ModulesID.USERS, PermissionsID.RESTORE )
            ],
            this.controller.restoreUserById
        )

        this.router.delete(
            '/users/destroy/:idDestroy',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission( ModulesID.USERS, PermissionsID.HARD_DELETE )
            ],
            this.controller.destroyUserById
        )
    }
}