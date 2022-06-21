import { red } from "colors";
import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { PermissionService } from "../services";
import { HttpResponse } from "../shared/response/http.response";


export class PermissionController {
    constructor(
        private readonly _permissionService: PermissionService = new PermissionService(),
        private readonly _httpResponse: HttpResponse = new HttpResponse()
    ) { }

    public findPermissions = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { from = 0, limit = 0, all = false, order = 'ASC' } = req.query

            const [data, totalCount] = await this._permissionService.findAllPermissions(
                Number(from),
                Number(limit),
                Boolean(all),
                String(order)
            )

            if (!data.length) return this._httpResponse.NotFound(res, `There are no results for the search`)

            return this._httpResponse.Ok(res, {
                from, limit, all, order,
                partialCount: data.length, totalCount,
                data
            })
        } catch (error) {
            console.log(red(`Error in PermissionController:findPermissions: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findOnePermissionById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data = await this._permissionService.findOnePermissionById(id)

            if (!data) return this._httpResponse.BadRequest(res, `There are no results for the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in PermissionController:findOnePermissionById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public createPermission = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const data = await this._permissionService.createPermission({ ...req.body })

            return this._httpResponse.Created(res, data)
        } catch (error) {
            console.log(red(`Error in PermissionController:createPermission: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public updatePermissionById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data: UpdateResult = await this._permissionService.updatePermissionById(id, { ...req.body })

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in PermissionController:updatePermissionById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public softDeletePermissionById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data: DeleteResult = await this._permissionService.softDeletePermissionById(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to remove the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in PermissionController:softDeletePermissionById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public restorePermissionById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data: UpdateResult = await this._permissionService.restorePermissionById(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to restore the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in PermissionController:restorePermissionById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public destroyPermissionById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params
            const data: DeleteResult = await this._permissionService.destroyPermissionById(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to destroy the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in PermissionController:destroyPermissionById: `))
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}