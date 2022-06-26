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
                absent: true,
                agendaSubjectItems: true,
                attachedFiles: true,
                commitments: true,
                reviewedBy: true,
                guest: true,
                summoned: true,
            },
            withDeleted: true
        })
    }

    public async createOneMeetingMinutes(body: MeetingMinutesDTO): Promise<MeetingMinutesEntity> {
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