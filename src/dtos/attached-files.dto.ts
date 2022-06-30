import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../config";
import { UserEntity } from "../models";


export class AttachedFilesDTO extends BaseDTO {
    @IsNotEmpty()
    internalFilename!: string

    @IsNotEmpty()
    publicFilename!: string

    @IsNotEmpty()
    fileLocation!: string

    @IsNotEmpty()
    author!: UserEntity

    @IsNotEmpty()
    mimetype!: string

    @IsNotEmpty()
    size!: number
}