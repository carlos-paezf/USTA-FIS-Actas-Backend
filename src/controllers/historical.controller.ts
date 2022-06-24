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

            if (!data.length) return this._httpResponse.NotFound(res, `There are no results for the search`)

            return this._httpResponse.Ok(res, {
                from, limit, order,
                partialCount: data.length, totalCount,
                data
            })
        } catch (error) {
            console.log(red(`Error in RecordController:findAllMoves: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findMoveById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const data = await this._service.findMoveById(id)

            if (!data) return this._httpResponse.NotFound(res, `There are no results for the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in RecordController:findMoveById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findMovesByUser = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params

            const [data, totalCount] = await this._service.findMovesByUser(userId)

            if (!data.length) return this._httpResponse.NotFound(res, `There are no results for the id '${userId}'`)

            return this._httpResponse.Ok(res, { totalCount, data })
        } catch (error) {
            console.log(red(`Error in RecordController:findMoveByUser: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findRejectedMoves = async (req: Request, res: Response) => {
        try {
            const { from = 0, limit = 10 } = req.query

            const [data, totalCount] = await this._service.findRejectedMoves(
                Number(from), Number(limit)
            )

            if (!data.length) return this._httpResponse.NotFound(res, `There are no results for the search`)

            return this._httpResponse.Ok(res, {
                from, limit,
                partialCount: data.length, totalCount,
                data
            })
        } catch (error) {
            console.log(red(`Error in RecordController:findMoveByUser: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}