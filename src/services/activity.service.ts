import { red } from "colors";

import { BaseService } from "../config";
import { CustomError } from "../helpers/custom-error.helper";
import { ActivityEntity } from "../models";
import { ObservationService } from "./observation.service";


export class ActivityService extends BaseService<ActivityEntity> {
    private readonly _observationService: ObservationService

    constructor() {
        super(ActivityEntity)
        this._observationService = new ObservationService()
    }

    // eslint-disable-next-line
    public async removeRelationship(activity: ActivityEntity, columnRelation: string): Promise<void> {
        try {
            const relationship = (await this.execRepository)
                .createQueryBuilder()
                .relation(ActivityEntity, columnRelation)
                .of(activity)
                .loadMany();

            (await this.execRepository)
                .createQueryBuilder()
                .relation(ActivityEntity, columnRelation)
                .of(activity)
                .remove(await relationship);
            // eslint-disable-next-line
        } catch (error: any) {
            console.log(red(`Error in MeetingMinutesService:addAndRemoveRelationship: `), error)
            throw new CustomError(`RemoveRelationship`, error.message, `RemoveRelationship`)
        }
    }

    public async destroyNullActivities() {
        const activitiesNull = await (
            (await this.execRepository)
                .createQueryBuilder(`activity`)
                .where(`activity.meetingMinutes IS NULL`)
                .getMany()
        )

        for (const activity of activitiesNull) {
            await this.removeRelationship(activity, `responsibleUsers`)
            await this.removeRelationship(activity, `observations`)
        }

        await this._observationService.destroyNullObservations()

        return (await this.execRepository)
            .createQueryBuilder()
            .where(`meetingMinutes IS NULL`)
            .delete()
            .execute()
    }
}