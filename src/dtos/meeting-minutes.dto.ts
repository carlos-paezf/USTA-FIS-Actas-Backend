import { IsDateString, IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../config";
import { ActivityEntity, AttachedFilesEntity, OrganizationEntity, SubjectAgendaItemEntity, UserEntity } from "../models";


export class MeetingMinutesDTO extends BaseDTO {
    @IsNotEmpty()
    numberMeetingMinutes!: number

    @IsOptional()
    isRegular?: boolean

    @IsNotEmpty()
    organizationCommitteeAreaProgram!: OrganizationEntity

    @IsNotEmpty()
    meetingPlace!: string

    @IsNotEmpty()
    @IsDateString()
    meetingDate!: Date

    @IsNotEmpty()
    startTime!: string

    @IsNotEmpty()
    endingTime!: string

    @IsNotEmpty()
    summoned!: UserEntity[]

    @IsOptional()
    absent?: UserEntity[]

    @IsOptional()
    guest?: UserEntity[]

    @IsNotEmpty()
    subjectAgendaItems!: SubjectAgendaItemEntity[]

    @IsOptional()
    attachedFiles?: AttachedFilesEntity[]

    @IsNotEmpty()
    commitments!: ActivityEntity[]

    @IsNotEmpty()
    createdBy!: UserEntity

    @IsNotEmpty()
    reviewedBy!: UserEntity
}