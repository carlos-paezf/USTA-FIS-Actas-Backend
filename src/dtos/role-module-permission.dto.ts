import { IsNotEmpty } from 'class-validator'
import { BaseDTO } from '../config/base.dto'
import { ModuleEntity, PermissionEntity, RoleEntity } from '../models'


/** 
 * RoleModulePermissionDTO is a class that extends BaseDTO and has three properties: 
 * `role`, `module`, and `permission`
 * 
 * @author Carlos Páez 
 */
export class RoleModulePermissionDTO extends BaseDTO {
    @IsNotEmpty()
    role!: RoleEntity

    @IsNotEmpty()
    module!: ModuleEntity

    @IsNotEmpty()
    permission!: PermissionEntity
}