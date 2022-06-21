import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../config";


/** 
 * `RoleDTO` is a class that extends `BaseDTO` and has two properties, 
 * `roleName` and `roleDescription`, that are both required. 
 */
export class RoleDTO extends BaseDTO {
    @IsNotEmpty()
    roleName!: string

    @IsNotEmpty()
    roleDescription!: string
}