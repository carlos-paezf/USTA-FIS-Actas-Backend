import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { BaseDTO } from "../config";
import { RoleEntity } from "../models";


/** 
 * Defining the roles that a user can have. 
 * 
 * @author Carlos Páez
 */
export enum PositionType {
    DEAN = 'DEAN',
    DEVELOPER = 'DEVELOPER',
    ADMINISTRATIVE = 'ADMINISTRATIVE',
    PROFESSOR = 'PROFESSOR',
    STUDENT = 'STUDENT',
    GUEST = 'GUEST'
}


/**
 * This class is a Data Transfer Object (DTO) that is used to transfer 
 * data between the client and the server. 
 * 
 * @author Carlos Páez
 */
export class UserDTO extends BaseDTO {
    @IsNotEmpty()
    name!: string

    @IsNotEmpty()
    lastName!: string

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(15)
    username!: string

    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsNotEmpty()
    password!: string

    @IsOptional()
    @IsEnum(PositionType)
    position?: PositionType

    @IsOptional()
    role?: RoleEntity
}