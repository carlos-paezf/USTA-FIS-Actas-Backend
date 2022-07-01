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

    public idParamValidator = async (req: Request, res: Response, next: NextFunction, id: string) => {
        try {
            if (req.query.deleted) return next()

            const attachedFileExists = await this._service.findOneAttachedFileById(id)

            return (!attachedFileExists)
                ? this.httpResponse.NotFound(res, `There are no results for the id '${id}'`)
                : next()
        } catch (error) {
            console.log(red(`Error in AttachedFilesMiddleware:idParamValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public idDisabledValidator = async (req: Request, res: Response, next: NextFunction, idDisabled: string) => {
        try {
            const attachedFileExists = await this._service.findOneAttachedFileById(idDisabled)

            if (!attachedFileExists) return this.httpResponse.NotFound(res, `There are no results for the id '${idDisabled}'`)

            const attachedFileEnabled = await this._service.attachedFileIsEnabled(idDisabled)

            return (!attachedFileEnabled)
                ? this.httpResponse.PreconditionFailed(res, `The attached file with the id ${idDisabled} is already disabled or has been deleted `)
                : next()
        } catch (error) {
            console.log(red(`Error in AttachedFilesMiddleware:idDisabledValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public idRestoreValidator = async (req: Request, res: Response, next: NextFunction, idRestore: string) => {
        try {
            const attachedFileExists = await this._service.findOneAttachedFileById(idRestore)

            if (!attachedFileExists) return this.httpResponse.NotFound(res, `There are no results for the id '${idRestore}'`)

            const attachedFileEnabled = await this._service.attachedFileIsEnabled(idRestore)

            return (attachedFileEnabled)
                ? this.httpResponse.PreconditionFailed(res, `The attached file with the id ${idRestore} is already enabled`)
                : next()
        } catch (error) {
            console.log(red(`Error in AttachedFilesMiddleware:idRestoreValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
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