import { AttachedFilesService } from "../services";
import { SharedMiddleware } from "../shared/middlewares/shared.middleware";
import { NextFunction, Request, Response } from 'express';
import { red } from "colors";
import { uploadFiles } from '../helpers/uploadFiles.helper';
import multer from "multer";


export class AttachedFilesMiddleware extends SharedMiddleware<AttachedFilesService> {
    constructor() {
        super(AttachedFilesService)
    }

    public uploadFilesMiddleware = (req: Request, res: Response, next: NextFunction) => {
        try {
            uploadFiles(req, res, (error) => {
                if (error instanceof multer.MulterError) {
                    return this.httpResponse.BadRequest(res, error)
                } else if (error) {
                    return this.httpResponse.BadRequest(res, error)
                } else {
                    return next()
                }
            })
        } catch (error) {
            console.log(red(`Error in AttachedFilesMiddleware:uploadFilesMiddleware: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }
}