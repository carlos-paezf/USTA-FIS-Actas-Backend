import { validate } from "class-validator";
import { red } from "colors";
import { NextFunction, Request, Response } from "express";

import { RoleModulePermissionDTO } from "../dtos";
import { RoleModulePermissionService } from "../services";
import { SharedMiddleware } from "../shared/middlewares/shared.middleware";


export class RoleModulePermissionMiddleware extends SharedMiddleware<RoleModulePermissionService> {
    constructor() {
        super(RoleModulePermissionService)
    }

    public idParamValidator = async (req: Request, res: Response, next: NextFunction, id: string) => {
        try {
            if (req.query.deleted) return next()

            const moduleExists = await this._service.findOneRoleModulePermissionById(id)

            return (!moduleExists)
                ? this.httpResponse.NotFound(res, `There are no results for the id '${id}'`)
                : next()
        } catch (error) {
            console.log(red(`Error in RoleModulePermissionMiddleware:idParamValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public idDisabledValidator = async (req: Request, res: Response, next: NextFunction, idDisabled: string) => {
        try {
            const roleModulePermissionEnable = await this._service.roleModulePermissionIsEnabled(idDisabled)

            return (!roleModulePermissionEnable)
                ? this.httpResponse.PreconditionFailed(res, `The role-module-permission with the id ${idDisabled} is already disabled or destroyed`)
                : next()
        } catch (error) {
            console.log(red(`Error in RoleModulePermissionMiddleware:idDisabledValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public idRestoreValidator = async (req: Request, res: Response, next: NextFunction, idEnabled: string) => {
        try {
            const roleModulePermissionEnable = await this._service.roleModulePermissionIsEnabled(idEnabled)

            return (roleModulePermissionEnable)
                ? this.httpResponse.PreconditionFailed(res, `The role-module-permission with the id ${idEnabled} is already enabled`)
                : next()
        } catch (error) {
            console.log(red(`Error in RoleModulePermissionMiddleware:idRestoreValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public validateExistingRoleModulePermission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { role, module, permission } = req.body

            const data = await this._service.validateRoleModulePermissionForJWT(role, module, permission)

            return (data)
                ? this.httpResponse.BadRequest(res, `A record already exists with the same data`)
                : next()
        } catch (error) {
            console.log(red(`Error in RoleModulePermissionMiddleware:validateExistingRoleModulePermission: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public roleModulePermissionValidator = (req: Request, res: Response, next: NextFunction) => {
        const { role, module, permission } = req.body

        const valid = new RoleModulePermissionDTO()

        valid.role = role
        valid.module = module
        valid.permission = permission

        validate(valid).then((error) => {
            return error.length ? this.httpResponse.PreconditionFailed(res, error) : next()
        })
    }
}