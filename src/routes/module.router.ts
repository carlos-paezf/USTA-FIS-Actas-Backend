import { BaseRouter } from "../config";
import { ModuleController } from "../controllers";
import { ModuleMiddleware } from "../middlewares";


export class ModuleRouter extends BaseRouter<ModuleController, ModuleMiddleware> {
    constructor() {
        super(ModuleController, ModuleMiddleware)
    }

    protected routes(): void {
        this.router.param('id', this.middleware.idParamValidator)

        this.router.get('/modules', this.controller.findModules)

        this.router.get('/modules/:id', this.controller.findOneModuleById)

        this.router.post(
            '/modules',
            [this.middleware.moduleNameValidator, this.middleware.moduleValidator,],
            this.controller.createModule
        )

        this.router.put(
            '/modules/:id',
            [this.middleware.moduleNameValidator],
            this.controller.updateModuleById
        )

        this.router.patch('/modules/restore/:id', this.controller.restoreModuleById)

        this.router.patch('/modules/disabled/:id', this.controller.softDeleteModuleById)

        this.router.delete('/modules/destroy/:id', this.controller.destroyModuleById)
    }
}