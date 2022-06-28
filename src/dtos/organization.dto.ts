import { IsEnum, IsNotEmpty } from "class-validator";
import { BaseDTO } from "../config";
import { OrganizationType } from "../models";


export class OrganizationDTO extends BaseDTO {
    @IsNotEmpty()
    @IsEnum(OrganizationType)
    organizationType!: OrganizationType

    @IsNotEmpty()
    organizationName!: string
}