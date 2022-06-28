import { IsDate, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../config";
import { FulfillmentType, MeetingMinutesEntity, ObservationEntity, UserEntity } from "../models";


export class ActivityDTO extends BaseDTO {
    @IsNotEmpty()
    nameActivity!: string

    @IsNotEmpty()
    @IsDate()
    activityDate!: Date

    @IsOptional()
    @IsEnum(FulfillmentType)
    fulfillment?: FulfillmentType

    @IsOptional()
    observations?: ObservationEntity[]

    @IsNotEmpty()
    responsibleUsers!: UserEntity[]

    @IsNotEmpty()
    meetingMinutes!: MeetingMinutesEntity
}