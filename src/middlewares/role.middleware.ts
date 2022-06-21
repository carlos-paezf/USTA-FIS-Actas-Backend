import { validate } from "class-validator";
import { red } from "colors";
import { NextFunction, Request, Response } from "express";

import { RoleDTO } from "../dtos";
import { RoleService } from "../services";
import { SharedMiddleware } from "../shared/middlewares/shared.middleware";


export class RoleMiddleware extends SharedMiddleware<RoleService> {
    constructor() {
        super(RoleService)
    }

    public idParamValidator = async (req: Request, res: Response, next: NextFunction, id: string) => {
        try {
            if (req.query.deleted) return next()

            const roleExists = await this._service.findOneRoleById(id)

            return (!roleExists)
                ? this.httpResponse.NotFound(res, `There are no results for the id '${id}'`)
                : next()
        } catch (error) {
            console.log(red(`Error in RoleMiddleware:idParamValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public idDisabledValidator = async (req: Request, res: Response, next: NextFunction, idDisabled: string) => {
        try {
            const roleEnable = await this._service.roleIsEnabled(idDisabled)

            return (!roleEnable)
                ? this.httpResponse.PreconditionFailed(res, `The role with the id ${idDisabled} is already disabled`)
                : next()
        } catch (error) {
            console.log(red(`Error in RoleMiddleware:idDisabledValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public idRestoreValidator = async (req: Request, res: Response, next: NextFunction, idEnabled: string) => {
        try {
            const roleEnable = await this._service.roleIsEnabled(idEnabled)

            return (roleEnable)
                ? this.httpResponse.PreconditionFailed(res, `The role with the id ${idEnabled} is already enabled`)
                : next()
        } catch (error) {
            console.log(red(`Error in RoleMiddleware:idRestoreValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public roleNameValidator = async (req: Request, res: Response, next: NextFunction) => {
        const { roleName } = req.body
        const roleExists = await this._service.findOneRoleByName(roleName.toUpperCase())

        return (roleExists)
            ? this.httpResponse.BadRequest(res, `The role name '${roleName}' is already being used`)
            : next()
    }

    public roleValidator = (req: Request, res: Response, next: NextFunction) => {
        const { roleName, roleDescription } = req.body

        const valid = new RoleDTO()

        valid.roleName = roleName
        valid.roleDescription = roleDescription

        validate(valid).then((error) => {
            return error.length ? this.httpResponse.PreconditionFailed(res, error) : next()
        })
    }
}