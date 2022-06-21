import { red } from "colors";
import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { RoleService } from "../services";
import { HttpResponse } from "../shared/response/http.response";


export class RoleController {
    constructor(
        private readonly _roleService: RoleService = new RoleService(),
        private readonly _httpResponse: HttpResponse = new HttpResponse()
    ) { }

    public findRoles = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { from = 0, limit = 0, all = false, order = 'ASC' } = req.query

            const [data, totalCount] = await this._roleService.findAllRoles(
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
            console.log(red(`Error in RoleController:findRoles: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findOneRoleById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data = await this._roleService.findOneRoleById(id)

            if (!data) return this._httpResponse.BadRequest(res, `There are no results for the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in RoleController:findOneRoleById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public createRole = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const data = await this._roleService.createRole({ ...req.body })

            return this._httpResponse.Created(res, data)
        } catch (error) {
            console.log(red(`Error in RoleController:create: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public updateRoleById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data: UpdateResult = await this._roleService.updateRoleById(id, { ...req.body })

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in RoleController:updateRoleById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public softDeleteRoleById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data: DeleteResult = await this._roleService.softDeleteRoleById(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to remove the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in RoleController:softDeleteRoleById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public restoreRoleById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data: UpdateResult = await this._roleService.restoreRoleById(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to restore the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in RoleController:restoreRoleById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public destroyRoleById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params
            const data: DeleteResult = await this._roleService.destroyRoleById(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to destroy the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in RoleController:destroyRoleById: `))
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}