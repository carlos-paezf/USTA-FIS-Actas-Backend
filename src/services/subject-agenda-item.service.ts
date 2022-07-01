import { red } from "colors";

import { BaseService } from "../config";
import { SubjectAgendaItemEntity } from "../models";
import { CustomError } from "../helpers/custom-error.helper";


export class SubjectAgendaItemService extends BaseService<SubjectAgendaItemEntity> {
    constructor() {
        super(SubjectAgendaItemEntity)
    }

    // eslint-disable-next-line
    public async removeRelationship(subjectAgendaItem: SubjectAgendaItemEntity, columnRelation: string): Promise<void> {
        try {
            const relationship = (await this.execRepository)
                .createQueryBuilder()
                .relation(SubjectAgendaItemEntity, columnRelation)
                .of(subjectAgendaItem)
                .loadMany();

            (await this.execRepository)
                .createQueryBuilder()
                .relation(SubjectAgendaItemEntity, columnRelation)
                .of(subjectAgendaItem)
                .remove(await relationship);
            // eslint-disable-next-line
        } catch (error: any) {
            console.log(red(`Error in MeetingMinutesService:addAndRemoveRelationship: `), error)
            throw new CustomError(`RemoveRelationship`, error.message, `RemoveRelationship`)
        }
    }

    public async destroyNullSubjectAgendaItems() {
        const subjectAgendaItemsNull = await (
            (await this.execRepository)
                .createQueryBuilder(`subjectAgendaItem`)
                .where(`subjectAgendaItem.meetingMinutes IS NULL`)
                .getMany()
        )

        for (const subjectAgendaItem of subjectAgendaItemsNull) {
            await this.removeRelationship(subjectAgendaItem, `meetingMinutes`)
        }

        return (await this.execRepository)
            .createQueryBuilder()
            .where(`meetingMinutes IS NULL`)
            .delete()
            .execute()
    }
}