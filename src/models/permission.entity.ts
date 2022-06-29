import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseEntity } from "../config";
import { RoleModulePermissionEntity } from "./role-module-permission.entity";


/** 
 * `PermissionEntity` is a class that extends `BaseEntity` and has 
 * a one to many relationship with `RoleModulePermissionEntity`. 
 * 
 * @author Carlos Páez
 */
@Entity({ name: `permissions` })
export class PermissionEntity extends BaseEntity {
    @Index({ fulltext: true })
    @Column({ unique: true, nullable: false })
    permissionName!: string

    @Index({ fulltext: true })
    @Column()
    permissionDescription!: string

    @OneToMany(() => RoleModulePermissionEntity, (roleModulePermission) => roleModulePermission.role, { cascade: true })
    rolesModulesPermissions!: RoleModulePermissionEntity[]
}