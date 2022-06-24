import { BaseRouter } from "../config";
import { PermissionController } from "../controllers";
import { ModulesID, PermissionsID } from "../helpers/enums.helper";
import { PermissionMiddleware } from "../middlewares";


export class PermissionRouter extends BaseRouter<PermissionController, PermissionMiddleware> {
    constructor() {
        super(PermissionController, PermissionMiddleware)
    }

    protected routes(): void {
        this.router.param('id', this.middleware.idParamValidator)

        this.router.get(
            '/permissions',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.PERMISSIONS, PermissionsID.READ)
            ],
            this.controller.findPermissions
        )

        this.router.get(
            '/permissions/:id',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.PERMISSIONS, PermissionsID.READ)
            ],
            this.controller.findOnePermissionById
        )

        this.router.post(
            '/permissions',
            [
                this.middleware.validateJWT,
                this.middleware.checkAdminRole,
                this.middleware.permissionNameValidator,
                this.middleware.permissionValidator,
            ],
            this.controller.createPermission
        )

        this.router.put(
            '/permissions/:id',
            [
                this.middleware.validateJWT,
                this.middleware.checkAdminRole,
                this.middleware.permissionNameValidator
            ],
            this.controller.updatePermissionById
        )

        this.router.param('idDisabled', this.middleware.idDisabledValidator)

        this.router.patch(
            '/permissions/disabled/:idDisabled',
            [
                this.middleware.validateJWT,
                this.middleware.checkAdminRole
            ],
            this.controller.softDeletePermissionById
        )

        this.router.param('idRestore', this.middleware.idRestoreValidator)

        this.router.patch(
            '/permissions/restore/:idRestore',
            [
                this.middleware.validateJWT,
                this.middleware.checkAdminRole
            ],
            this.controller.restorePermissionById
        )

        this.router.delete(
            '/permissions/destroy/:idDestroy',
            [
                this.middleware.validateJWT,
                this.middleware.checkAdminRole
            ],
            this.controller.destroyPermissionById
        )
    }
}