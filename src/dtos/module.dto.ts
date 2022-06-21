import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../config";


/**
 * This class is a DTO (Data Transfer Object) that is used to transfer data 
 * between the client and the server. It is used to create a new module. 
 * 
 * @author Carlos Páez
 */
export class ModuleDTO extends BaseDTO {
    @IsNotEmpty()
    moduleName!: string

    @IsNotEmpty()
    moduleDescription!: string
}