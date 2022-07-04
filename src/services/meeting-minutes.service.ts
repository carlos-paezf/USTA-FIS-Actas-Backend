import { UpdateResult, DeleteResult } from 'typeorm';
import { red } from 'colors';

import { BaseService } from "../config";
import { MeetingMinutesDTO } from "../dtos";
import { MeetingMinutesEntity } from "../models";
import { CustomError } from "../helpers/custom-error.helper";
import { ActivityService } from './activity.service';
import { SubjectAgendaItemService } from './subject-agenda-item.service';


export class MeetingMinutesService extends BaseService<MeetingMinutesEntity> {
    private readonly _activityService: ActivityService
    private readonly _subjectAgendaService: SubjectAgendaItemService

    constructor() {
        super(MeetingMinutesEntity)
        this._activityService = new ActivityService()
        this._subjectAgendaService = new SubjectAgendaItemService()
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
                    observations: true,
                    meetingMinutes: true
                },
                attachedFiles: {
                    author: true
                },
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

    // eslint-disable-next-line
    public async addAndRemoveRelationship(meetingMinutes: MeetingMinutesEntity, columnRelation: string, newRelationship: any): Promise<void> {
        try {
            const relationship = (await this.execRepository)
                .createQueryBuilder()
                .relation(MeetingMinutesEntity, columnRelation)
                .of(meetingMinutes)
                .loadMany();

            (await this.execRepository)
                .createQueryBuilder()
                .relation(MeetingMinutesEntity, columnRelation)
                .of(meetingMinutes)
                .remove(await relationship);

            (await this.execRepository)
                .createQueryBuilder()
                .relation(MeetingMinutesEntity, columnRelation)
                .of(meetingMinutes)
                .addAndRemove(newRelationship, await relationship);
            // eslint-disable-next-line
        } catch (error: any) {
            console.log(red(`Error in MeetingMinutesService:addAndRemoveRelationship: `), error)
            throw new CustomError(`ManyToMany`, error.message, `RelationManyToMany`)
        }
    }

    public async updateMeetingMinutesById(id: string, updateInfo: MeetingMinutesDTO) {
        try {
            const { summoned, absent, guest, attachedFiles, subjectAgendaItems, commitments } = updateInfo

            const meetingMinutes = await ((await this.execRepository).findOneBy({ id }))

            if (!meetingMinutes) return null

            await this.addAndRemoveRelationship(meetingMinutes, `summoned`, summoned)
            await this.addAndRemoveRelationship(meetingMinutes, `absent`, absent)
            await this.addAndRemoveRelationship(meetingMinutes, `guest`, guest)
            await this.addAndRemoveRelationship(meetingMinutes, `attachedFiles`, attachedFiles)
            await this.addAndRemoveRelationship(meetingMinutes, `subjectAgendaItems`, subjectAgendaItems)
            await this.addAndRemoveRelationship(meetingMinutes, `commitments`, commitments)

            return (await this.execRepository).save({ ...meetingMinutes, subjectAgendaItems, commitments })

            // eslint-disable-next-line
        } catch (error: any) {
            console.log(red(`Error in MeetingMinutesService:updateMeetingMinutesById: `), error)
            throw new CustomError(`ManyToMany`, error.message, `RelationManyToMany`)
        }
    }

    public async softDeleteMeetingMinutesById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).softDelete(id)
    }

    public async restoreMeetingMinutesById(id: string): Promise<UpdateResult> {
        return (await this.execRepository).restore(id)
    }

    // eslint-disable-next-line
    public async removeRelationship(meetingMinutes: MeetingMinutesEntity, columnRelation: string): Promise<void> {
        try {
            const relationship = (await this.execRepository)
                .createQueryBuilder()
                .relation(MeetingMinutesEntity, columnRelation)
                .of(meetingMinutes)
                .loadMany();

            (await this.execRepository)
                .createQueryBuilder()
                .relation(MeetingMinutesEntity, columnRelation)
                .of(meetingMinutes)
                .remove(await relationship);
            // eslint-disable-next-line
        } catch (error: any) {
            console.log(red(`Error in MeetingMinutesService:addAndRemoveRelationship: `), error)
            throw new CustomError(`RemoveRelationship`, error.message, `RemoveRelationship`)
        }
    }

    public async destroyMeetingMinutesById(id: string) {
        try {
            const meetingMinutes = await ((await this.execRepository).findOneBy({ id }))

            if (!meetingMinutes) return null

            await this.removeRelationship(meetingMinutes, `summoned`)
            await this.removeRelationship(meetingMinutes, `absent`)
            await this.removeRelationship(meetingMinutes, `guest`)
            await this.removeRelationship(meetingMinutes, `attachedFiles`)
            await this.removeRelationship(meetingMinutes, `subjectAgendaItems`)
            await this.removeRelationship(meetingMinutes, `commitments`)

            await this._activityService.destroyNullActivities()
            await this._subjectAgendaService.destroyNullSubjectAgendaItems()

            return (await this.execRepository).delete(id)

            // eslint-disable-next-line
        } catch (error: any) {
            console.log(red(`Error in MeetingMinutesService:destroyMeetingMinutesById`), error)
            return new CustomError(`DestroyMeetinMinutes`, error.message)
        }
    }

    public async meetingMinutesIsEnabled(id: string): Promise<MeetingMinutesEntity | null> {
        return (await this.execRepository).findOne({
            where: { id, deletedAt: undefined },
            select: { id: true }
        })
    }
}