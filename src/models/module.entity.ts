import { Column, Entity, Index, OneToMany } from "typeorm";
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
    @Index({ fulltext: true })
    @Column({ unique: true, nullable: false })
    moduleName!: string

    @Index({ fulltext: true })
    @Column()
    moduleDescription!: string

    @OneToMany(() => RoleModulePermissionEntity, (roleModulePermission) => roleModulePermission.role, { cascade: true })
    rolesModulesPermissions!: RoleModulePermissionEntity[]
}