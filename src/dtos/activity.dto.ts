import { IsDate, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../config";
import { FulfillmentType, MeetingMinutesEntity, UserEntity } from "../models";


export class ActivityDTO extends BaseDTO {
    @IsNotEmpty()
    nameActivity!: string

    @IsNotEmpty()
    meetingMinutes!: MeetingMinutesEntity

    @IsNotEmpty()
    responsibleUser!: UserEntity

    @IsNotEmpty()
    @IsDate()
    activityDate!: Date

    @IsOptional()
    @IsEnum(FulfillmentType)
    fulfillment?: FulfillmentType
}