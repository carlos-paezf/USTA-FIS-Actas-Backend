import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../config/base.entity';
import { ModuleEntity } from './module.entity';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';


/** 
 * A `RoleModulePermissionEntity` is a relationship between a `RoleEntity`, a `ModuleEntity`, 
 * and a `PermissionEntity`. 
 * 
 * @author Carlos Páez
 */
@Entity({ name: `roles_modules_permissions` })
export class RoleModulePermissionEntity extends BaseEntity {
    @ManyToOne(() => RoleEntity, (role) => role.rolesModulesPermissions)
    @JoinColumn({ name: `role_id` })
    role!: RoleEntity

    @ManyToOne(() => ModuleEntity, (module) => module.rolesModulesPermissions)
    @JoinColumn({ name: `module_id` })
    module!: ModuleEntity

    @ManyToOne(() => PermissionEntity, (permission) => permission.rolesModulesPermissions)
    @JoinColumn({ name: `permission_id` })
    permission!: PermissionEntity
}