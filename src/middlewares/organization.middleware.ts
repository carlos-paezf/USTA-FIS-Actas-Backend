import { SharedMiddleware } from "../shared/middlewares/shared.middleware";
import { OrganizationService } from '../services/organization.service';
import { NextFunction, Request, Response } from "express";
import { red } from "colors";
import { OrganizationDTO } from "../dtos";
import { validate } from "class-validator";


export class OrganizationMiddleware extends SharedMiddleware<OrganizationService> {
    constructor() {
        super(OrganizationService)
    }

    public idParamValidator = async (req: Request, res: Response, next: NextFunction, id: string) => {
        try {
            if (req.query.deleted) return next()

            const organizationExist = await this._service.findOneOrganizationById(id, false)

            return (organizationExist)
                ? next()
                : this.httpResponse.NotFound(res, `There are no results for the id '${id}'`)
        } catch (error) {
            console.log(red(`Error in OrganizationMiddleware:idParamValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public idDisabledValidator = async (req: Request, res: Response, next: NextFunction, idDisabled: string) => {
        try {
            const organizationEnabled = await this._service.organizationIsEnabled(idDisabled)

            return !organizationEnabled ? this.httpResponse.PreconditionFailed(res, `The user with the id ${idDisabled} is already disabled`) : next()
        } catch (error) {
            console.log(red(`Error in UserMiddleware:idDisabledValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public idRestoreValidator = async (req: Request, res: Response, next: NextFunction, idEnabled: string) => {
        try {
            const organizationEnabled = await this._service.organizationIsEnabled(idEnabled)

            return organizationEnabled ? this.httpResponse.PreconditionFailed(res, `The user with the id ${idEnabled} is already enabled`) : next()
        } catch (error) {
            console.log(red(`Error in UserMiddleware:idRestoreValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public organizationNameValidator = async (req: Request, res: Response, next: NextFunction) => {
        const { organizationName } = req.body
        const roleExists = await this._service.findOneOrganizationByName(organizationName.toUpperCase())

        return (roleExists)
            ? this.httpResponse.BadRequest(res, `The organization name '${organizationName}' is already being used`)
            : next()
    }

    public organizationValidator = async (req: Request, res: Response, next: NextFunction) => {
        const { organizationType, organizationName } = req.body

        const valid = new OrganizationDTO()

        valid.organizationType = organizationType
        valid.organizationName = organizationName

        validate(valid).then(async (error) => {
            return error.length ? this.httpResponse.PreconditionFailed(res, error) : next()
        })
    }
}