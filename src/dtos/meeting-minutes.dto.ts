import { IsDate, IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../config";
import { UserEntity } from "../models";


export class MeetingMinutesDTO extends BaseDTO {
    @IsNotEmpty()
    numberMeetingMinutes!: number

    @IsOptional()
    isRegular?: boolean

    @IsNotEmpty()
    organismCommitteeAreaProgram!: string

    @IsNotEmpty()
    meetingPlace!: string

    @IsNotEmpty()
    @IsDate()
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
    createdBy!: UserEntity

    @IsNotEmpty()
    reviewedBy!: UserEntity
}