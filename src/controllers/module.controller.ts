import { red } from "colors";
import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { ModuleService } from "../services";
import { HttpResponse } from "../shared/response/http.response";


export class ModuleController {
    constructor(
        private readonly _moduleService: ModuleService = new ModuleService(),
        private readonly _httpResponse: HttpResponse = new HttpResponse()
    ) { }

    public findModules = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { from = 0, limit = 0, all = false, order = 'ASC' } = req.query

            const [data, totalCount] = await this._moduleService.findAllModules(
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
            console.log(red(`Error in ModuleController:findModules: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findOneModuleById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data = await this._moduleService.findOneModuleById(id)

            if (!data) return this._httpResponse.BadRequest(res, `There are no results for the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in ModuleController:findOneModuleById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public createModule = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const data = await this._moduleService.createModule({ ...req.body })

            return this._httpResponse.Created(res, data)
        } catch (error) {
            console.log(red(`Error in ModuleController:createModule: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public updateModuleById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data: UpdateResult = await this._moduleService.updateModuleById(id, { ...req.body })

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in ModuleController:updateModuleById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public softDeleteModuleById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data: DeleteResult = await this._moduleService.softDeleteModuleById(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to remove the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in ModuleController:softDeleteModuleById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public restoreModuleById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data: UpdateResult = await this._moduleService.restoreModuleById(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to restore the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in ModuleController:restoreModuleById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public destroyModuleById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params
            const data: DeleteResult = await this._moduleService.destroyModuleById(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to destroy the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in ModuleController:destroyModuleById: `))
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}