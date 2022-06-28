import { Request, Response } from "express";
import { BaseController } from "../config";
import { MeetingMinutesService, UserService } from "../services";
import { red } from 'colors';


export class MeetingMinutesController extends BaseController<MeetingMinutesService> {
    private _userService: UserService

    constructor() {
        super(MeetingMinutesService)
        this._userService = new UserService()
    }

    public findAllMeetingMinutes = async (req: Request, res: Response) => {
        try {
            const { from = 0, limit = 10, order = 'ASC' } = req.query

            const [data, totalCount] = await this._service.findAllMeetingMinutes(
                Number(from), Number(limit), String(order).toUpperCase()
            )

            if (!data.length) return this._httpResponse.NotFound(res, `There are no results for the search`)

            return this._httpResponse.Ok(res, {
                from, limit, order,
                partialCount: data.length, totalCount,
                data
            })
        } catch (error) {
            console.log(red(`Error in MeetingMinutesController:findAllMeetingMinutes: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findOneMeetingMinutesById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const data = await this._service.findOneMeetingMinutesById(id)

            if (!data) return this._httpResponse.NotFound(res, `There are no result for the id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in MeetingMinutesController:findOneMeetingMinutesById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public createMeetingMinutes = async (req: Request, res: Response) => {
        try {
            const { summoned, absent, guest } = req.body

            let summonedUsers
            if (summoned.length) {
                summonedUsers = await this._userService.findUsersByIds(Array.from(new Set(summoned)))
                if (!summonedUsers.length) return this._httpResponse.BadRequest(res, `The users indicated as summoned have not been found`)
            }

            let absentUsers
            if (absent.length) {
                absentUsers = await this._userService.findUsersByIds(Array.from(new Set(absent)))
                if (!absentUsers.length) return this._httpResponse.BadRequest(res, `The users indicated as absent have not been found`)
            }

            let guestUsers
            if (guest.length) {
                guestUsers = await this._userService.findUsersByIds(Array.from(new Set(guest)))
                if (!guestUsers.length) return this._httpResponse.BadRequest(res, `The users indicated as guest have not been found`)
            }

            const meetingMinutes = await this._service.saveMeetingMinutes({
                ...req.body, summoned: summonedUsers, absent: absentUsers, guest: guestUsers,
            })

            return this._httpResponse.Created(res, meetingMinutes)
        } catch (error) {
            console.log(red(`Error in MeetingMinutesController:createMeetingMinutes: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}