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

        this.router.patch('/roles/restore/:id', this.controller.restoreRoleById)

        this.router.patch('/roles/disabled/:id', this.controller.softDeleteRoleById)

        this.router.delete('/roles/destroy/:id', this.controller.destroyRoleById)
    }
}