import { red } from "colors";
import { NextFunction, Request, Response } from "express";
import { HistoricalService } from "../services";
import { SharedMiddleware } from "../shared/middlewares/shared.middleware";


export class HistoricalMiddleware extends SharedMiddleware<HistoricalService> {
    constructor() {
        super(HistoricalService)
    }

    public idParamValidator = async (req: Request, res: Response, next: NextFunction, id: string) => {
        try {
            if (req.query.deleted) return next()

            const moveExists = await this._service.findMoveById(id)

            return (!moveExists)
                ? this.httpResponse.NotFound(res, `There are no results for the id '${id}'`)
                : next()
        } catch (error) {
            console.log(red(`Error in HistoricalMiddleware:idParamValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }
}