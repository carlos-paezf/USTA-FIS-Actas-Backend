import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../config";
import { MeetingMinutesEntity } from "../models";


export class AttachedFilesDTO extends BaseDTO {
    @IsOptional()
    meetingMinutes!: MeetingMinutesEntity

    @IsOptional()
    internalFilename?: string

    @IsNotEmpty()
    publicFilename!: string

    @IsOptional()
    fileLocation?: string

    @IsNotEmpty()
    author!: string
}