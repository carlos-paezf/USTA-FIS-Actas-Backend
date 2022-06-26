import { BaseService } from "../config";
import { SubjectAgendaItemDTO } from "../dtos";
import { SubjectAgendaItemEntity } from "../models";
import { UpdateResult, DeleteResult } from 'typeorm';


export class SubjectAgendaItemService extends BaseService<SubjectAgendaItemEntity> {
    constructor() {
        super(SubjectAgendaItemEntity)
    }

    public async findAllSubjectAgendaItemsByMeetingMinutesId(meetingMinutesId: string): Promise<[SubjectAgendaItemEntity[], number]> {
        return (await this.execRepository)
            .createQueryBuilder(`subjectAgendaItem`)
            .where(`subjectAgendaItem.meetingMinutes = :meetingMinutesId`, { meetingMinutesId })
            .leftJoin(`subjectAgendaItem.meetingMinutes`, `meetingMinutes`)
            .getManyAndCount()
    }

    public async findOneSubjectAgendaItemById(id: string): Promise<SubjectAgendaItemEntity | null> {
        return (await this.execRepository).findOne({
            where: { id }
        })
    }

    public async createSubjectAgendaItem(body: SubjectAgendaItemDTO): Promise<SubjectAgendaItemEntity> {
        return (await this.execRepository).save(body)
    }

    public async updateSubjectAgendaItemById(id: string, infoUpdate: SubjectAgendaItemDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { ...infoUpdate, updatedAt: new Date() })
    }

    public async deleteSubjectAgendaItemById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete(id)
    }
}