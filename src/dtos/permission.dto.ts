import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../config";


/**
 * The `PermissionDTO` class is a Data Transfer Object (DTO) that is used 
 * to transfer data between the client and the server 
 * 
 * @author Carlos Páez
 */
export class PermissionDTO extends BaseDTO {
    @IsNotEmpty()
    permissionName!: string

    @IsNotEmpty()
    permissionDescription!: string
}