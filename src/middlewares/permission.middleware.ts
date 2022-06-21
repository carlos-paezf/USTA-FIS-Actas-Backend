import { validate } from "class-validator";
import { red } from "colors";
import { NextFunction, Request, Response } from "express";

import { PermissionDTO } from "../dtos";
import { PermissionService } from "../services";
import { SharedMiddleware } from "../shared/middlewares/shared.middleware";


export class PermissionMiddleware extends SharedMiddleware {
    constructor(private _permissionService: PermissionService = new PermissionService()) {
        super()
    }

    public idParamValidator = async (req: Request, res: Response, next: NextFunction, id: string) => {
        try {
            const permissionExists = await this._permissionService.findOnePermissionById(id)

            return (permissionExists) ? next() : this.httpResponse.NotFound(res, `There are no results for the id '${id}'`)
        } catch (error) {
            console.log(red(`Error in PermissionMiddleware:idParamValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public permissionNameValidator = async (req: Request, res: Response, next: NextFunction) => {
        const { permissionName } = req.body
        const permissionExists = await this._permissionService.findOnePermissionByName(permissionName)

        if (permissionExists) return this.httpResponse.BadRequest(res, `The role name '${permissionName}' is already being used`)

        return next()
    }

    public permissionValidator = (req: Request, res: Response, next: NextFunction) => {
        const { permissionName, permissionDescription } = req.body

        const valid = new PermissionDTO()

        valid.permissionName = permissionName
        valid.permissionDescription = permissionDescription

        validate(valid).then((error) => {
            return error.length ? this.httpResponse.BadRequest(res, error) : next()
        })
    }
}