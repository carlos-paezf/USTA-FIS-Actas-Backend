import { red } from 'colors';
import { NextFunction, Request, Response } from 'express';

import { ModuleService, PermissionService } from '../../services';
import { AuthMiddleware } from './auth.middleware';


const _moduleService: ModuleService = new ModuleService()
const _permissionService: PermissionService = new PermissionService()


export class SharedMiddleware<T> extends AuthMiddleware {
    protected readonly _service: T

    constructor(TService: { new(): T }) {
        super()
        this._service = new TService()
    }

    /**
     * If the module is not enabled, return a precondition failed response, otherwise, call the next function
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - this is the response object that is passed to the middleware
     * @param {NextFunction} next - NextFunction -&gt; This is a function that is used to call the next
     * middleware in the chain.
     * @returns the result of the next() function.
     */
    public validateModuleIsEnabled = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { module } = req.body
            const moduleEnabled = await _moduleService.moduleIsEnabled(module)

            return (!moduleEnabled)
                ? this.httpResponse.PreconditionFailed(res, `Module with id ${module} is disabled or has been removed`)
                : next()
        } catch (error) {
            console.log(red(`Error in SharedMiddleware:validateModuleIsEnabled: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    /**
     * If the permission is not enabled, return a precondition failed response, otherwise, call the next function
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - this is the response object that is passed to the middleware
     * @param {NextFunction} next - NextFunction -&gt; This is a function that is used to call the next
     * middleware in the chain.
     * @returns the result of the next() function.
     */
    public validatePermissionIsEnabled = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { permission } = req.body
            const permissionEnabled = await _permissionService.permissionIsEnabled(permission)

            return (!permissionEnabled)
                ? this.httpResponse.PreconditionFailed(res, `Permission with id ${permission} is disabled or has been removed`)
                : next()
        } catch (error) {
            console.log(red(`Error in SharedMiddleware:validatePermissionIsEnabled: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }
}