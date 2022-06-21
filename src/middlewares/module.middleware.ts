import { validate } from "class-validator";
import { red } from "colors";
import { NextFunction, Request, Response } from "express";

import { ModuleDTO } from "../dtos";
import { ModuleService } from "../services";
import { SharedMiddleware } from "../shared/middlewares/shared.middleware";


export class ModuleMiddleware extends SharedMiddleware {
    constructor(private _moduleService: ModuleService = new ModuleService()) {
        super()
    }

    public idParamValidator = async (req: Request, res: Response, next: NextFunction, id: string) => {
        try {
            const moduleExists = await this._moduleService.findOneModuleById(id)

            return (moduleExists) ? next() : this.httpResponse.NotFound(res, `There are no results for the id '${id}'`)
        } catch (error) {
            console.log(red(`Error in ModuleMiddleware:idParamValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public moduleNameValidator = async (req: Request, res: Response, next: NextFunction) => {
        const { moduleName } = req.body
        const roleExists = await this._moduleService.findOneModuleByName(moduleName)

        if (roleExists) return this.httpResponse.BadRequest(res, `The role name '${moduleName}' is already being used`)

        return next()
    }

    public moduleValidator = (req: Request, res: Response, next: NextFunction) => {
        const { moduleName, moduleDescription } = req.body

        const valid = new ModuleDTO()

        valid.moduleName = moduleName
        valid.moduleDescription = moduleDescription

        validate(valid).then((error) => {
            return error.length ? this.httpResponse.BadRequest(res, error) : next()
        })
    }
}