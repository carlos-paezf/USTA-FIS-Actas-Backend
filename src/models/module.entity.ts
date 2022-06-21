import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../config";
import { RoleModulePermissionEntity } from "./role-module-permission.entity";


/** 
 * A `ModuleEntity` has a `moduleName` and a `moduleDescription` and 
 * a list of RoleModulePermissionEntity objects. 
 * 
 * @author Carlos Páez
 */
@Entity({ name: `modules` })
export class ModuleEntity extends BaseEntity {
    @Column()
    moduleName!: string

    @Column()
    moduleDescription!: string

    @OneToMany(() => RoleModulePermissionEntity, (roleModulePermission) => roleModulePermission.role, { cascade: true })
    rolesModulesPermissions!: RoleModulePermissionEntity[]
}