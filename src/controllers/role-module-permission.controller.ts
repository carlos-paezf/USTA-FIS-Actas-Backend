import { red } from "colors";
import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { BaseController } from "../config";
import { RoleModulePermissionService } from "../services";


export class RoleModulePermissionController extends BaseController<RoleModulePermissionService> {
    constructor() {
        super(RoleModulePermissionService)
    }

    public findAllRolesModulesPermissions = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { from = 0, limit = 0, order = 'ASC' } = req.query

            const [data, totalCount] = await this._service.findAllRolesModulesPermissions(
                Number(from),
                Number(limit),
                String(order).toUpperCase()
            )

            if (!data.length) return this._httpResponse.NotFound(res, `There are no results for the search`)

            return this._httpResponse.Ok(res, {
                from, limit, order,
                partialCount: data.length, totalCount,
                data
            })
        } catch (error) {
            console.log(red(`Error in RoleModulePermissionController:findAllRolesModulesPermissions: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findOneRoleModulePermissionById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params
            const { deleted } = req.query

            const data = deleted
                ? await this._service.findOneRoleModulePermissionByIdIncludeDeleted(id)
                : await this._service.findOneRoleModulePermissionById(id)

            if (!data) return this._httpResponse.NotFound(res, `There are no results for the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in RoleModulePermissionController:findRoleModulePermissionById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public createRoleModulePermission = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const data = await this._service.createRoleModulePermission({ ...req.body })

            return this._httpResponse.Created(res, data)
        } catch (error) {
            console.log(red(`Error in RoleModulePermissionController:createRoleModulePermission: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public softDeleteRoleModulePermissionById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { idDisabled } = req.params

            const data: DeleteResult = await this._service.softDeleteRoleModulePermissionById(idDisabled)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to remove the id '${idDisabled}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in RoleModulePermissionController:softDeleteRoleModulePermissionById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public restoreRoleModulePermissionById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { idRestore } = req.params

            const data: UpdateResult = await this._service.restoreRoleModulePermissionById(idRestore)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to restore the id '${idRestore}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in RoleModulePermissionController:retoreRoleModulePermissionById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public destroyRoleModulePermissionById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { idDestroy } = req.params
            const data: DeleteResult = await this._service.destroyRoleModulePermissionById(idDestroy)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to destroy the id '${idDestroy}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in RoleModulePermissionController:destroyRoleModulePermissionById: `))
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}