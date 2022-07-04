import { Request, Response } from "express";
import { red } from 'colors';

import { BaseController } from "../config";
import { AttachedFilesService, MeetingMinutesService, UserService } from "../services";
import { ActivityEntity, AttachedFilesEntity, UserEntity } from "../models";
import { DeleteResult, UpdateResult } from 'typeorm';


export class MeetingMinutesController extends BaseController<MeetingMinutesService> {
    private readonly _userService: UserService
    private readonly _attachedFiles: AttachedFilesService

    constructor() {
        super(MeetingMinutesService)
        this._userService = new UserService()
        this._attachedFiles = new AttachedFilesService()
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
            const { summoned, absent, guest, attachedFiles, commitments } = req.body

            const summonedUsers: UserEntity[] = []
            if (summoned.length) {
                for (const userId of Array.from(new Set(summoned))) {
                    const user = await this._userService.findOneUserById(String(userId))
                    if (!user) {
                        return this._httpResponse.BadRequest(res, `The user with the id '${userId}' indicated as summoned has not been found`)
                    }
                    summonedUsers.push(user)
                }
            }

            const absentUsers: UserEntity[] = []
            if (absent.length) {
                for (const userId of Array.from(new Set(absent))) {
                    const user = await this._userService.findOneUserById(String(userId))
                    if (!user) {
                        return this._httpResponse.BadRequest(res, `The user with the id '${userId}' indicated as absent has not been found`)
                    }
                    absentUsers.push(user)
                }
            }

            const guestUsers: UserEntity[] = []
            if (guest.length) {
                for (const userId of Array.from(new Set(guest))) {
                    const user = await this._userService.findOneUserById(String(userId))
                    if (!user) {
                        return this._httpResponse.BadRequest(res, `The user with the id '${userId}' indicated as guest has not been found`)
                    }
                    guestUsers.push(user)
                }
            }

            const files: AttachedFilesEntity[] = []
            if (attachedFiles.length) {
                for (const fileId of Array.from(new Set(attachedFiles))) {
                    const file = await this._attachedFiles.findOneAttachedFileById(String(fileId))
                    if (!file) {
                        return this._httpResponse.BadRequest(res, `File with id '${fileId}' does not exist`)
                    }
                    files.push(file)
                }
            }

            const commitmentsSend: ActivityEntity[] = []
            for (const activity of commitments) {
                const usersActivity: UserEntity[] = []

                for (const userId of Array.from(new Set(activity.responsibleUsers))) {
                    const user = await this._userService.findOneUserById(String(userId))
                    if (!user) {
                        return this._httpResponse.BadRequest(res, `The user with the id '${userId}' indicated as responsible for the activity '${activity.nameActivity}' has not been found`)
                    }
                    usersActivity.push(user)
                }

                commitmentsSend.push({ ...activity, responsibleUsers: usersActivity })
            }

            const meetingMinutes = await this._service.saveMeetingMinutes({
                ...req.body, summoned: summonedUsers, absent: absentUsers, guest: guestUsers, attachedFiles: files, commitments: commitmentsSend
            })

            return this._httpResponse.Created(res, meetingMinutes)
        } catch (error) {
            console.log(red(`Error in MeetingMinutesController:createMeetingMinutes: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public updateMeetingMinutesById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { summoned, absent, guest, attachedFiles, commitments } = req.body

            const summonedUsers: UserEntity[] = []
            if (summoned.length) {
                for (const userId of Array.from(new Set(summoned))) {
                    const user = await this._userService.findOneUserById(String(userId))
                    if (!user) {
                        return this._httpResponse.BadRequest(res, `The user with the id '${userId}' indicated as summoned has not been found`)
                    }
                    summonedUsers.push(user)
                }
            }

            const absentUsers: UserEntity[] = []
            if (absent.length) {
                for (const userId of Array.from(new Set(absent))) {
                    const user = await this._userService.findOneUserById(String(userId))
                    if (!user) {
                        return this._httpResponse.BadRequest(res, `The user with the id '${userId}' indicated as absent has not been found`)
                    }
                    absentUsers.push(user)
                }
            }

            const guestUsers: UserEntity[] = []
            if (guest.length) {
                for (const userId of Array.from(new Set(guest))) {
                    const user = await this._userService.findOneUserById(String(userId))
                    if (!user) {
                        return this._httpResponse.BadRequest(res, `The user with the id '${userId}' indicated as guest has not been found`)
                    }
                    guestUsers.push(user)
                }
            }

            const files: AttachedFilesEntity[] = []
            if (attachedFiles.length) {
                for (const fileId of Array.from(new Set(attachedFiles))) {
                    const file = await this._attachedFiles.findOneAttachedFileById(String(fileId))
                    if (!file) {
                        return this._httpResponse.BadRequest(res, `File with id '${fileId}' does not exist`)
                    }
                    files.push(file)
                }
            }

            const commitmentsSend: ActivityEntity[] = []
            for (const activity of commitments) {
                const usersActivity: UserEntity[] = []

                for (const userId of Array.from(new Set(activity.responsibleUsers))) {
                    const user = await this._userService.findOneUserById(String(userId))
                    if (!user) {
                        return this._httpResponse.BadRequest(res, `The user with the id '${userId}' indicated as responsible for the activity '${activity.nameActivity}' has not been found`)
                    }
                    usersActivity.push(user)
                }

                commitmentsSend.push({ ...activity, responsibleUsers: usersActivity })
            }

            const data = await this._service.updateMeetingMinutesById(id, {
                ...req.body, summoned: summonedUsers, absent: absentUsers, guest: guestUsers, attachedFiles: files, commitments: commitmentsSend
            })

            if (!data) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)

            // eslint-disable-next-line
        } catch (error: any) {
            console.log(red(`Error in MeetingMinutesController:updateMeetingMinutesById: `), error)
            return this._httpResponse.InternalServerError(res, error.message)
        }
    }

    public softDeleteMeetingMinutesById = async (req: Request, res: Response) => {
        try {
            const { idDisabled } = req.params

            const data: DeleteResult = await this._service.softDeleteMeetingMinutesById(idDisabled)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in MeetingMinutesController:softDeleteMeetingMinutesById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public restoreMeetingMinutesById = async (req: Request, res: Response) => {
        try {
            const { idRestore } = req.params

            const data: UpdateResult = await this._service.restoreMeetingMinutesById(idRestore)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in MeetingMinutesController:restoreMeetingMinutesById: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public destroyMeetingMinutesById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            // eslint-disable-next-line
            const data: any = await this._service.destroyMeetingMinutesById(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, `Changes have not been applied`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red(`Error in MeetingMinutesController:destroyMeetingMinutes: `), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}