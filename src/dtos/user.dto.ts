import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../config";


/** 
 * Defining the roles that a user can have. 
 * 
 * @author Carlos Páez
 */
export enum RoleType {
    DEAN = 'DEAN',
    ADMINISTRATIVE = 'ADMINISTRATIVE',
    PROFESSOR = 'PROFESSOR',
    GUEST = 'GUEST',
    USER = 'USER',
    DEVELOPER = 'DEVELOPER'
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
    username!: string

    @IsNotEmpty()
    email!: string

    @IsNotEmpty()
    password!: string

    @IsNotEmpty()
    role!: RoleType
}