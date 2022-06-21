import { validate } from "class-validator";
import { red } from "colors";
import { NextFunction, Request, Response } from "express";

import { PermissionDTO } from "../dtos";
import { PermissionService } from "../services";
import { SharedMiddleware } from "../shared/middlewares/shared.middleware";


export class PermissionMiddleware extends SharedMiddleware<PermissionService> {
    constructor() {
        super(PermissionService)
    }

    public idParamValidator = async (req: Request, res: Response, next: NextFunction, id: string) => {
        try {
            if (req.query.deleted) return next()

            const permissionExists = await this._service.findOnePermissionById(id)

            return (!permissionExists)
                ? this.httpResponse.NotFound(res, `There are no results for the id '${id}'`)
                : next()
        } catch (error) {
            console.log(red(`Error in PermissionMiddleware:idParamValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public idDisabledValidator = async (req: Request, res: Response, next: NextFunction, idDisabled: string) => {
        try {
            const permissionEnable = await this._service.permissionIsEnabled(idDisabled)

            return (!permissionEnable)
                ? this.httpResponse.PreconditionFailed(res, `The permission with the id ${idDisabled} is already disabled`)
                : next()
        } catch (error) {
            console.log(red(`Error in PermissionMiddleware:idDisabledValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public idRestoreValidator = async (req: Request, res: Response, next: NextFunction, idEnabled: string) => {
        try {
            const permissionEnable = await this._service.permissionIsEnabled(idEnabled)

            return (permissionEnable)
                ? this.httpResponse.PreconditionFailed(res, `The permission with the id ${idEnabled} is already enabled`)
                : next()
        } catch (error) {
            console.log(red(`Error in PermissionMiddleware:idRestoreValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public permissionNameValidator = async (req: Request, res: Response, next: NextFunction) => {
        const { permissionName } = req.body
        const permissionExists = await this._service.findOnePermissionByName(permissionName.toUpperCase())

        return (permissionExists)
            ? this.httpResponse.BadRequest(res, `The permission name '${permissionName}' is already being used`)
            : next()
    }

    public permissionValidator = (req: Request, res: Response, next: NextFunction) => {
        const { permissionName, permissionDescription } = req.body

        const valid = new PermissionDTO()

        valid.permissionName = permissionName
        valid.permissionDescription = permissionDescription

        validate(valid).then((error) => {
            return error.length ? this.httpResponse.PreconditionFailed(res, error) : next()
        })
    }
}