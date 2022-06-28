import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../config";


export class AttachedFilesDTO extends BaseDTO {
    @IsOptional()
    internalFilename?: string

    @IsNotEmpty()
    publicFilename!: string

    @IsOptional()
    fileLocation?: string

    @IsNotEmpty()
    author!: string
}