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

        this.router.param('idDisabled', this.middleware.idDisabledValidator)

        this.router.patch('/modules/disabled/:idDisabled', this.controller.softDeleteModuleById)

        this.router.param('idRestore', this.middleware.idRestoreValidator)

        this.router.patch('/modules/restore/:idRestore', this.controller.restoreModuleById)

        this.router.delete('/modules/destroy/:idDestroy', this.controller.destroyModuleById)
    }
}