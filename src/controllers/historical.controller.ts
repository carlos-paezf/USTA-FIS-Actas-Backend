import { red } from "colors";
import { Request, Response } from "express";
import { BaseController } from "../config";
import { HistoricalService } from "../services";


export class HistoricalController extends BaseController<HistoricalService> {
    constructor() {
        super(HistoricalService)
    }

    public findAllMoves = async (req: Request, res: Response) => {
        try {
            const { from = 0, limit = 10, order = 'ASC' } = req.query

            const [data, totalCount] = await this._service.findAllMoves(
                Number(from), Number(limit), String(order).toUpperCase()
            )

            if (!data.length) return await this._httpResponse.NotFound(req, res, `There are no results for the search`)

            return await this._httpResponse.Ok(req, res, {
                from, limit, order,
                partialCount: data.length, totalCount,
                data
            })
        } catch (error) {
            console.log(red(`Error in RecordController:findAllMoves: `), error)
            return await this._httpResponse.InternalServerError(req, res, error)
        }
    }

    public findMoveById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const data = await this._service.findMoveById(id)

            if (!data) return await this._httpResponse.NotFound(req, res, `There are no results for the id '${id}'`)

            return await this._httpResponse.Ok(req, res, data)
        } catch (error) {
            console.log(red(`Error in RecordController:findMoveById: `), error)
            return await this._httpResponse.InternalServerError(req, res, error)
        }
    }

    public findMovesByUser = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params

            const [data, totalCount] = await this._service.findMovesByUser(userId)

            if (!data.length) return await this._httpResponse.NotFound(req, res, `There are no results for the id '${userId}'`)

            return await this._httpResponse.Ok(req, res, { totalCount, data })
        } catch (error) {
            console.log(red(`Error in RecordController:findMoveByUser: `), error)
            return await this._httpResponse.InternalServerError(req, res, error)
        }
    }

    public findRejectedMoves = async (req: Request, res: Response) => {
        try {
            const { from = 0, limit = 10 } = req.query

            const [data, totalCount] = await this._service.findRejectedMoves(
                Number(from), Number(limit)
            )

            if (!data.length) return await this._httpResponse.NotFound(req, res, `There are no results for the search`)

            return await this._httpResponse.Ok(req, res, {
                from, limit,
                partialCount: data.length, totalCount,
                data
            })
        } catch (error) {
            console.log(red(`Error in RecordController:findMoveByUser: `), error)
            return await this._httpResponse.InternalServerError(req, res, error)
        }
    }
}