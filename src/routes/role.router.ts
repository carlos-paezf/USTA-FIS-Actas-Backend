import { BaseRouter } from "../config";
import { RoleController } from "../controllers";
import { RoleMiddleware } from "../middlewares";


export class RoleRouter extends BaseRouter<RoleController, RoleMiddleware> {
    constructor() {
        super(RoleController, RoleMiddleware)
    }

    protected routes(): void {
        this.router.param('id', this.middleware.idParamValidator)

        this.router.get('/roles', this.controller.findRoles)

        this.router.get('/roles/:id', this.controller.findOneRoleById)

        this.router.post(
            '/roles',
            [this.middleware.roleNameValidator, this.middleware.roleValidator,],
            this.controller.createRole
        )

        this.router.put(
            '/roles/:id',
            [this.middleware.roleNameValidator],
            this.controller.updateRoleById
        )

        this.router.param('idDisabled', this.middleware.idDisabledValidator)

        this.router.patch('/roles/disabled/:idDisabled', this.controller.softDeleteRoleById)

        this.router.param('idRestore', this.middleware.idRestoreValidator)

        this.router.patch('/roles/restore/:idRestore', this.controller.restoreRoleById)

        this.router.delete('/roles/destroy/:idDestroy', this.controller.destroyRoleById)
    }
}