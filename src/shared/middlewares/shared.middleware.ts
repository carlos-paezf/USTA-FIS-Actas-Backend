import { red } from 'colors';
import { NextFunction, Request, Response } from 'express';
import { ModuleService, PermissionService, RoleService } from '../../services';
import { HttpResponse } from '../response/http.response';


export class SharedMiddleware<T> {
    protected _service: T

    constructor(TService: { new(): T }, protected readonly httpResponse: HttpResponse = new HttpResponse()) {
        this._service = new TService()
    }

    private readonly _roleService: RoleService = new RoleService()
    private readonly _moduleService: ModuleService = new ModuleService()
    private readonly _permissionService: PermissionService = new PermissionService()

    public validateRoleIsEnabled = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { role } = req.body
            const roleEnabled = await this._roleService.roleIsEnabled(role)

            return (!roleEnabled)
                ? this.httpResponse.PreconditionFailed(res, `Role with id ${role} is disabled or has been removed`)
                : next()
        } catch (error) {
            console.log(red(`Error in SharedMiddleware:validateRoleIsEnabled: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public validateModuleIsEnabled = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { module } = req.body
            const moduleEnabled = await this._moduleService.moduleIsEnabled(module)

            return (!moduleEnabled)
                ? this.httpResponse.PreconditionFailed(res, `Module with id ${module} is disabled or has been removed`)
                : next()
        } catch (error) {
            console.log(red(`Error in SharedMiddleware:validateModuleIsEnabled: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public validatePermissionIsEnabled = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { permission } = req.body
            const permissionEnabled = await this._permissionService.permissionIsEnabled(permission)

            return (!permissionEnabled)
                ? this.httpResponse.PreconditionFailed(res, `Permission with id ${permission} is disabled or has been removed`)
                : next()
        } catch (error) {
            console.log(red(`Error in SharedMiddleware:validatePermissionIsEnabled: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }
}