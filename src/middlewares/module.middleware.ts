import { validate } from "class-validator";
import { red } from "colors";
import { NextFunction, Request, Response } from "express";

import { ModuleDTO } from "../dtos";
import { ModuleService } from "../services";
import { SharedMiddleware } from "../shared/middlewares/shared.middleware";


export class ModuleMiddleware extends SharedMiddleware<ModuleService> {
    constructor() {
        super(ModuleService)
    }

    public idParamValidator = async (req: Request, res: Response, next: NextFunction, id: string) => {
        try {
            if (req.query.deleted) return next()

            const moduleExists = await this._service.findOneModuleById(id)

            return (!moduleExists)
                ? await this.httpResponse.NotFound(req, res, `There are no results for the id '${id}'`)
                : next()
        } catch (error) {
            console.log(red(`Error in ModuleMiddleware:idParamValidator: `), error)
            return await this.httpResponse.InternalServerError(req, res, error)
        }
    }

    public idDisabledValidator = async (req: Request, res: Response, next: NextFunction, idDisabled: string) => {
        try {
            const moduleEnable = await this._service.moduleIsEnabled(idDisabled)

            return (!moduleEnable)
                ? await this.httpResponse.PreconditionFailed(req, res, `The module with the id ${idDisabled} is already disabled`)
                : next()
        } catch (error) {
            console.log(red(`Error in ModuleMiddleware:idDisabledValidator: `), error)
            return await this.httpResponse.InternalServerError(req, res, error)
        }
    }

    public idRestoreValidator = async (req: Request, res: Response, next: NextFunction, idEnabled: string) => {
        try {
            const moduleEnable = await this._service.moduleIsEnabled(idEnabled)

            return moduleEnable
                ? await this.httpResponse.PreconditionFailed(req, res, `The module with the id ${idEnabled} is already enabled`)
                : next()
        } catch (error) {
            console.log(red(`Error in ModuleMiddleware:idRestoreValidator: `), error)
            return await this.httpResponse.InternalServerError(req, res, error)
        }
    }

    public moduleNameValidator = async (req: Request, res: Response, next: NextFunction) => {
        const { moduleName } = req.body
        const roleExists = await this._service.findOneModuleByName(moduleName.toUpperCase())

        return (roleExists)
            ? await this.httpResponse.BadRequest(req, res, `The module name '${moduleName}' is already being used`)
            : next()
    }

    public moduleValidator = async (req: Request, res: Response, next: NextFunction) => {
        const { moduleName, moduleDescription } = req.body

        const valid = new ModuleDTO()

        valid.moduleName = moduleName
        valid.moduleDescription = moduleDescription

        validate(valid).then(async (error) => {
            return error.length ? await this.httpResponse.PreconditionFailed(req, res, error) : next()
        })
    }
}