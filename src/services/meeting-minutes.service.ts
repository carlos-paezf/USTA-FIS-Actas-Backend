import { BaseService } from "../config";
import { MeetingMinutesDTO } from "../dtos";
import { MeetingMinutesEntity } from "../models";
import { UpdateResult, DeleteResult } from 'typeorm';


export class MeetingMinutesService extends BaseService<MeetingMinutesEntity> {
    constructor() {
        super(MeetingMinutesEntity)
    }

    public async findAllMeetingMinutes(from: number, limit: number, order: string): Promise<[MeetingMinutesEntity[], number]> {
        return (await this.execRepository).findAndCount({
            skip: from, take: limit,
            order: { numberMeetingMinutes: (order === 'ASC') ? 'ASC' : 'DESC' },
            withDeleted: true
        })
    }

    public async findOneMeetingMinutesById(id: string): Promise<MeetingMinutesEntity | null> {
        return (await this.execRepository).findOne({
            where: { id },
            relations: {
                organizationCommitteeAreaProgram: true,
                summoned: true,
                absent: true,
                guest: true,
                subjectAgendaItems: true,
                commitments: {
                    responsibleUsers: true,
                    meetingMinutes: true
                },
                attachedFiles: true,
                createdBy: true,
                reviewedBy: true,
            },
            withDeleted: true
        })
    }

    public async createMeetingMinutes(body: MeetingMinutesDTO): Promise<MeetingMinutesEntity> {
        return (await this.execRepository).create(body)
    }

    public async saveMeetingMinutes(body: MeetingMinutesDTO): Promise<MeetingMinutesEntity> {
        return (await this.execRepository).save(body)
    }

    public async updateMeetingMinutesById(id: string, updateInfo: MeetingMinutesDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { ...updateInfo, updatedAt: new Date() })
    }

    public async softDeleteMeetingMinutesById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).softDelete(id)
    }

    public async restoreMeetingMinutesById(id: string): Promise<UpdateResult> {
        return (await this.execRepository).restore(id)
    }

    public async destroyMeetingMinutesById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete(id)
    }
}