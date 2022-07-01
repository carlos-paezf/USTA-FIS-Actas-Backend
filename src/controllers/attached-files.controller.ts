import { red } from "colors";
import { Request, Response } from "express";
import { TokenPayload } from "../auth/types/auth.interface";

import { BaseController } from "../config";
import { AttachedFilesEntity } from "../models";
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
            const { filename = '', mimetype = '' } = req.query

            const { 0: data, 1: totalCount } = await this._service.searchAttachedFiles(
                String(filename).toUpperCase(), String(mimetype).toUpperCase()
            )

            if (!data.length) return this._httpResponse.NotFound(res, `No results were found for the queried values: filename: '${filename}', mimetype: ${mimetype}`)

            return this._httpResponse.Ok(res, {
                filename, mimetype, totalCount, data
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
            // eslint-disable-next-line
            const upload: any = req.files
            const user = req.user as TokenPayload

            if (!user) return this._httpResponse.Forbidden(res, `You do not have permissions for this action`)

            if (!upload) return this._httpResponse.BadRequest(res, `The 'attached_files' property must be sent in the form-data`)
            if (!upload.length) return this._httpResponse.BadRequest(res, `Please choose files`)

            // eslint-disable-next-line
            const data: any = []

            for (const { originalname, mimetype, filename, size } of upload) {
                const body: unknown = {
                    internalFilename: filename,
                    publicFilename: originalname,
                    fileLocation: filename,
                    author: user.id,
                    mimetype,
                    size
                }
                data.push(await this._service.uploadAttachedFile(body as AttachedFilesEntity))
            }

            return this._httpResponse.Created(res, { data })
        } catch (error) {
            console.log(red(`Error in AttachedFilesController:uploadAttachedFiles: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}