import { BaseRouter } from "../config";
import { PermissionController } from "../controllers";
import { PermissionMiddleware } from "../middlewares";


export class PermissionRouter extends BaseRouter<PermissionController, PermissionMiddleware> {
    constructor() {
        super(PermissionController, PermissionMiddleware)
    }

    protected routes(): void {
        this.router.param('id', this.middleware.idParamValidator)

        this.router.get('/permission', this.controller.findPermissions)

        this.router.get('/permission/:id', this.controller.findOnePermissionById)

        this.router.post(
            '/permission',
            [this.middleware.permissionNameValidator, this.middleware.permissionValidator,],
            this.controller.createPermission
        )

        this.router.put(
            '/permission/:id',
            [this.middleware.permissionNameValidator],
            this.controller.updatePermissionById
        )

        this.router.patch('/permission/restore/:id', this.controller.restorePermissionById)

        this.router.patch('/permission/disabled/:id', this.controller.softDeletePermissionById)

        this.router.delete('/permission/destroy/:id', this.controller.destroyPermissionById)
    }
}