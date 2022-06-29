import { red } from "colors";
import { Request, Response } from "express";
import { BaseController } from "../config";
import { AttachedFilesService } from "../services";


export class AttachedFilesController extends BaseController<AttachedFilesService> {
    constructor() {
        super(AttachedFilesService)
    }

    public findAllAttachedFiles = async (req: Request, res: Response) => {
        try {
            const { from = 0, limit = 10, order = 'ASC', all = false } = req.query

            const [data, totalCount] = await this._service.findAllAttachedFiles(
                Number(from), Number(limit), String(order).toUpperCase(), Boolean(all)
            )

            if (!data.length) return this._httpResponse.NotFound(res, `There are no results for the search`)

            return this._httpResponse.Ok(res, {
                from, limit, order, all,
                partialCount: data.length, totalCount,
                data
            })
        } catch (error) {
            console.log(red(`Error in AttachedFilesController:findAllAttachedFiles: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findAllDeletedAttachedFiles = async (req: Request, res: Response) => {
        try {
            const { from = 0, limit = 10, order = 'ASC' } = req.query

            const [data, totalCount] = await this._service.findAllDeletedAttachedFiles(
                Number(from), Number(limit), String(order).toUpperCase()
            )

            if (!data.length) return this._httpResponse.NotFound(res, `There are no results for the search`)

            return this._httpResponse.Ok(res, {
                from, limit, order,
                partialCount: data.length, totalCount,
                data
            })
        } catch (error) {
            console.log(red(`Error in AttachedFilesController:findAllAttachedFiles: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public searchAttachedFiles = async (req: Request, res: Response) => {
        try {
            const { filename = '', author = '' } = req.query

            const { 0: data, 1: totalCount } = await this._service.searchAttachedFiles(
                String(filename).toUpperCase(), String(author).toUpperCase()
            )

            if (!data.length) return this._httpResponse.NotFound(res, `No results were found for the queried values: filename: '${filename}', author '${author}'`)

            return this._httpResponse.Ok(res, {
                filename, author,
                totalCount, data
            })
        } catch (error) {
            console.log(red(`Error in AttachedFilesController:searchAttachedFiles: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findOneAttachedFileById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { deleted = false } = req.query

            const data = await this._service.findOneAttachedFileById(id, Boolean(deleted))

            if (!data) return this._httpResponse.NotFound(res, `There are no result for the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in AttachedFilesController:findOneAttachedFileById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public uploadAttachedFiles = async (req: Request, res: Response) => {
        try {
            // TODO: Carga de archivos
            console.log(req.file)
            return this._httpResponse.Ok(res, {})
        } catch (error) {
            console.log(red(`Error in AttachedFilesController:uploadAttachedFiles: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}