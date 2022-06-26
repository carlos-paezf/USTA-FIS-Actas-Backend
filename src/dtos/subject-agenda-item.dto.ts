import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../config";
import { MeetingMinutesEntity } from "../models";


export class SubjectAgendaItemDTO extends BaseDTO {
    @IsNotEmpty()
    meetingMinutes!: MeetingMinutesEntity

    @IsNotEmpty()
    itemNumber!: number

    @IsNotEmpty()
    itemContent!: string

    @IsOptional()
    itemDevelopment?: string
}