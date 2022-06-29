import { red } from "colors";
import { Request, Response } from "express";
import { BaseController } from "../config";
import { OrganizationService } from "../services";
import { UpdateResult, DeleteResult } from 'typeorm';


export class OrganizationController extends BaseController<OrganizationService> {
    constructor() {
        super(OrganizationService)
    }

    public findAllOrganizations = async (req: Request, res: Response) => {
        try {
            const { from = 0, limit = 10, all = false, order = 'ASC' } = req.query

            const [data, totalCount] = await this._service.findAllOrganizations(
                Number(from), Number(limit), String(order).toUpperCase(), Boolean(all)
            )

            if (!data.length) return this._httpResponse.NotFound(res, `There are no results for the search`)

            return this._httpResponse.Ok(res, {
                from, limit, order, all,
                partialCount: data.length, totalCount,
                data
            })
        } catch (error) {
            console.log(red(`Error in OrganizationController:findAllOrganizations: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findAllDeletedOrganizations = async (req: Request, res: Response) => {
        try {
            const { from = 0, limit = 10, order = 'ASC' } = req.query

            const [data, totalCount] = await this._service.findAllDeletedOrganizations(
                Number(from), Number(limit), String(order).toUpperCase()
            )

            if (!data.length) return this._httpResponse.NotFound(res, `There are no results for the search`)

            return this._httpResponse.Ok(res, {
                from, limit, order,
                partialCount: data.length, totalCount,
                data
            })
        } catch (error) {
            console.log(red(`Error in OrganizationController:findAllOrganizations: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public searchOrganizationsByName = async (req: Request, res: Response) => {
        try {
            const { name } = req.query

            const { 0: data, 1: totalCount } = await this._service.searchOrganizationsByName(String(name).toUpperCase())

            if (!data.length) return this._httpResponse.NotFound(res, `There are no results for the name: '${name}'`)

            return this._httpResponse.Ok(res, {
                name, totalCount, data
            })
        } catch (error) {
            console.log(red(`Error un OrganizationController:findOneOrganizationById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findOneOrganizationById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { deleted = false } = req.query

            const data = await this._service.findOneOrganizationById(id, Boolean(deleted))

            if (!data) return this._httpResponse.NotFound(res, `There are no results for the id: '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error un OrganizationController:findOneOrganizationById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public saveOrganization = async (req: Request, res: Response) => {
        try {
            const data = await this._service.saveOrganization({ ...req.body })

            return this._httpResponse.Created(res, data)
        } catch (error) {
            console.log(red(`Error in OrganizationController:saveOrganization: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public updateOrganizationById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const data: UpdateResult = await this._service.updateOrganizationById(id, { ...req.body })

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in OrganizationController:updateOrganizationById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public softDeleteOrganizationById = async (req: Request, res: Response) => {
        try {
            const { idDisabled } = req.params

            const data: DeleteResult = await this._service.softDeleteOrganizationById(idDisabled)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in OrganizationController:softDeleteOrganizationById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public restoreOrganizationById = async (req: Request, res: Response) => {
        try {
            const { idRestore } = req.params

            const data: UpdateResult = await this._service.restoreOrganizationById(idRestore)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in OrganizationController:restoreOrganizationById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public destroyOrganizationById = async (req: Request, res: Response) => {
        try {
            const { idDestroy } = req.params

            const data: DeleteResult = await this._service.destroyOrganizationById(idDestroy)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in OrganizationController:destroyOrganizationById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}