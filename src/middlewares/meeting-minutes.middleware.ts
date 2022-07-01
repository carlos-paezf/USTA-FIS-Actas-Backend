import { NextFunction, Request, Response } from "express";
import { MeetingMinutesService } from "../services";
import { SharedMiddleware } from "../shared/middlewares/shared.middleware";
import { red } from 'colors';
import { MeetingMinutesDTO } from "../dtos";
import { validate } from "class-validator";


export class MeetingMinutesMiddleware extends SharedMiddleware<MeetingMinutesService> {
    constructor() {
        super(MeetingMinutesService)
    }

    public idParamValidator = async (req: Request, res: Response, next: NextFunction, id: string) => {
        try {
            if (req.query.deleted) return next()

            const meetingMinutesExists = await this._service.findOneMeetingMinutesById(id)

            return (!meetingMinutesExists)
                ? this.httpResponse.NotFound(res, `There are no results for the id '${id}'`)
                : next()
        } catch (error) {
            console.log(red(`Error in MeetingMinutesMiddleware:idParamValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public idDisabledValidator = async (req: Request, res: Response, next: NextFunction, idDisabled: string) => {
        try {
            const meetingMinutesExists = await this._service.findOneMeetingMinutesById(idDisabled)

            if (!meetingMinutesExists) return this.httpResponse.NotFound(res, `There are no results for the id '${idDisabled}'`)

            const meetingMinutesEnable = await this._service.meetingMinutesIsEnabled(idDisabled)

            return !meetingMinutesEnable
                ? this.httpResponse.PreconditionFailed(res, `The user with the id ${idDisabled} is already disabled`)
                : next()
        } catch (error) {
            console.log(red(`Error in MeetingMinutesMiddleware:idDisabledValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public idRestoreValidator = async (req: Request, res: Response, next: NextFunction, idRestore: string) => {
        try {
            const meetingMinutesExists = await this._service.findOneMeetingMinutesById(idRestore)

            if (!meetingMinutesExists) return this.httpResponse.NotFound(res, `There are no results for the id '${idRestore}'`)

            const meetingMinutesEnable = await this._service.meetingMinutesIsEnabled(idRestore)

            return meetingMinutesEnable
                ? this.httpResponse.PreconditionFailed(res, `The user with the id ${idRestore} is already disabled`)
                : next()
        } catch (error) {
            console.log(red(`Error in MeetingMinutesMiddleware:idEnabledValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    public meetingMinutesValidator = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const valid = new MeetingMinutesDTO()

            valid.numberMeetingMinutes = req.body.numberMeetingMinutes
            valid.isRegular = req.body.isRegular
            valid.organizationCommitteeAreaProgram = req.body.organizationCommitteeAreaProgram
            valid.meetingPlace = req.body.meetingPlace
            valid.meetingDate = req.body.meetingDate
            valid.startTime = req.body.startTime
            valid.endingTime = req.body.endingTime
            valid.summoned = req.body.summoned
            valid.absent = req.body.absent
            valid.guest = req.body.guest
            valid.subjectAgendaItems = req.body.subjectAgendaItems
            valid.commitments = req.body.commitments
            valid.createdBy = req.body.createdBy
            valid.reviewedBy = req.body.reviewedBy

            validate(valid).then((error) => {
                return error.length ? this.httpResponse.PreconditionFailed(res, error) : next()
            })
        } catch (error) {
            console.log(red(`Error in MeetingMinutesMiddleware:meetingMinutesValidator: `), error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }
}