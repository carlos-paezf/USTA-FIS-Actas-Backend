import { validate } from "class-validator";
import { red } from "colors";
import { NextFunction, Request, Response } from "express";

import { RoleDTO } from "../dtos";
import { RoleService } from "../services";
import { SharedMiddleware } from "../shared/middlewares/shared.middleware";


export class RoleMiddleware extends SharedMiddleware {
    constructor(private _roleService: RoleService = new RoleService()) {
        super()
    }

    public idParamValidator = async (req: Request, res: Response, next: NextFunction, id: string) => {
        try {
            const roleExists = await this._roleService.findOneRoleById(id)

            return (roleExists) ? next() : this.httpResponse.NotFound(res, `There are no results for the id '${id}'`)
        } catch (error) {
            console.log(red(`Error in RoleMiddleware:idParamValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public roleNameValidator = async (req: Request, res: Response, next: NextFunction) => {
        const { roleName } = req.body
        const roleExists = await this._roleService.findOneRoleByName(roleName)

        if (roleExists) return this.httpResponse.BadRequest(res, `The role name '${roleName}' is already being used`)

        return next()
    }

    public roleValidator = (req: Request, res: Response, next: NextFunction) => {
        const { roleName, roleDescription } = req.body

        const valid = new RoleDTO()

        valid.roleName = roleName
        valid.roleDescription = roleDescription

        validate(valid).then((error) => {
            return error.length ? this.httpResponse.BadRequest(res, error) : next()
        })
    }
}