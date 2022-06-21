import { IsEmail, IsOptional, MaxLength, MinLength } from "class-validator";


export class CustomFieldsHelper {
    @IsEmail()
    @IsOptional()
    email?: string

    @IsOptional()
    @MinLength(4)
    @MaxLength(15)
    username?: string
}