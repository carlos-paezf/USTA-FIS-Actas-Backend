import { BaseRouter } from "../config";
import { RoleModulePermissionController } from "../controllers";
import { RoleModulePermissionMiddleware } from "../middlewares";


export class RoleModulePermissionRouter extends BaseRouter<RoleModulePermissionController, RoleModulePermissionMiddleware> {
    constructor() {
        super(RoleModulePermissionController, RoleModulePermissionMiddleware)
    }

    protected routes(): void {
        this.router.param('id', this.middleware.idParamValidator)

        this.router.get('/roles-modules-permissions', this.controller.findAllRolesModulesPermissions)

        this.router.get('/roles-modules-permissions/:id', this.controller.findOneRoleModulePermissionById)

        this.router.post(
            '/roles-modules-permissions',
            [
                this.middleware.validateRoleIsEnabled,
                this.middleware.validateModuleIsEnabled,
                this.middleware.validatePermissionIsEnabled,
                this.middleware.roleModulePermissionValidator,
                this.middleware.validateExistingRoleModulePermission
            ],
            this.controller.createRoleModulePermission
        )

        this.router.param('idDisabled', this.middleware.idDisabledValidator)

        this.router.patch(
            '/roles-modules-permissions/disabled/:idDisabled',
            this.controller.softDeleteRoleModulePermissionById
        )

        this.router.param('idRestore', this.middleware.idRestoreValidator)

        this.router.patch(
            '/roles-modules-permissions/restore/:idRestore',
            this.controller.restoreRoleModulePermissionById
        )

        this.router.delete(
            '/roles-modules-permissions/destroy/:idDestroy',
            this.controller.destroyRoleModulePermissionById
        )
    }
}