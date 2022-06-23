import { IsEmail, IsOptional, MaxLength, MinLength } from "class-validator";
import { RoleEntity } from "../models";


export class CustomFieldsHelper {
    @IsEmail()
    @IsOptional()
    email?: string

    @IsOptional()
    @MinLength(4)
    @MaxLength(15)
    username?: string

    @IsOptional()
    role?: RoleEntity
}