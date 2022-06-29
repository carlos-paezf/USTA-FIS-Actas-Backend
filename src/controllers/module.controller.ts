import { red } from "colors";
import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";

import { BaseController } from "../config";
import { ModuleService } from "../services";


export class ModuleController extends BaseController<ModuleService> {
    constructor() {
        super(ModuleService)
    }

    public findModules = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { from = 0, limit = 0, all = false, order = 'ASC' } = req.query

            const [data, totalCount] = await this._service.findAllModules(
                Number(from),
                Number(limit),
                Boolean(all),
                String(order).toUpperCase()
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
            const { deleted } = req.query

            const data = deleted
                ? await this._service.findOneModuleByIdIncludeDeleted(id)
                : await this._service.findOneModuleById(id)

            if (!data) return this._httpResponse.BadRequest(res, `There are no results for the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in ModuleController:findOneModuleById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public createModule = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const data = await this._service.createModule({ ...req.body })

            return this._httpResponse.Created(res, data)
        } catch (error) {
            console.log(red(`Error in ModuleController:createModule: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public updateModuleById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data: UpdateResult = await this._service.updateModuleById(id, { ...req.body })

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in ModuleController:updateModuleById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public softDeleteModuleById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { idDisabled } = req.params

            const data: DeleteResult = await this._service.softDeleteModuleById(idDisabled)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to remove the id '${idDisabled}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in ModuleController:softDeleteModuleById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public restoreModuleById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { idRestore } = req.params

            const data: UpdateResult = await this._service.restoreModuleById(idRestore)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to restore the id '${idRestore}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in ModuleController:restoreModuleById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public destroyModuleById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { idDestroy } = req.params
            const data: DeleteResult = await this._service.destroyModuleById(idDestroy)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Unable to destroy the id '${idDestroy}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in ModuleController:destroyModuleById: `))
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}