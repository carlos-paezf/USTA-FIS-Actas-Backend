import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator"
import { BaseDTO } from "../config"
import { RoleEntity } from "../models"


/** 
 * Defining the roles that a user can have. 
 * 
 * @author Carlos Páez
 */
export enum PositionType {
    DEAN = 'Decano',
    DEVELOPER = 'Desarrollador',
    ADMINISTRATIVE = 'Administrativo',
    PROFESSOR = 'Docente',
    STUDENT = 'Estudiante',
    GUEST = 'Invitado'
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
    @MinLength( 6 )
    @MaxLength( 15 )
    username!: string

    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsNotEmpty()
    @MinLength( 6 )
    password!: string

    /*  @IsOptional()
        @IsEnum(PositionType)
        position?: PositionType */

    @IsOptional()
    position?: string

    @IsOptional()
    role?: RoleEntity

    @IsNotEmpty()
    profileImage!: string
}