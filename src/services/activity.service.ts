import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config";
import { ActivityDTO } from "../dtos";
import { ActivityEntity } from "../models";


export class ActivityService extends BaseService<ActivityEntity> {
    constructor() {
        super(ActivityEntity)
    }

    public async findAllActivitiesByMeetingMinutes(meetingMinutesId: string): Promise<[ActivityEntity[], number]> {
        return (await this.execRepository)
            .createQueryBuilder('activity')
            .where(`activity.meetingMinutes = :meetingMinutesId`, { meetingMinutesId })
            .leftJoin(`activity.meetingMinutes`, `meetingMinutes`, `meetingMinutes.id = :meetingMinutesId`, { meetingMinutesId })
            .getManyAndCount()
    }

    public async findUnfulfilledActivitiesFromPreviousMinutes(currentMeetingId: string): Promise<[ActivityEntity[], number]> {
        return (await this.execRepository)
            .createQueryBuilder(`activity`)
            .where(`activity.meetingMinutes NOT IN (${currentMeetingId})`)
            .leftJoin(`activity.meetingMinutes`, `meetingMinutes`)
            .getManyAndCount()
    }

    public async createActivity(body: ActivityDTO): Promise<ActivityEntity> {
        return (await this.execRepository).save(body)
    }

    public async updateActivityById(id: string, infoUpdate: ActivityDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { ...infoUpdate, updatedAt: new Date() })
    }

    public async softDeleteActivityById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).softDelete(id)
    }

    public async restoreActivityById(id: string): Promise<UpdateResult> {
        return (await this.execRepository).restore(id)
    }

    public async destroyActivityById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete(id)
    }
}