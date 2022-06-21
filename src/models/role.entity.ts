import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../config";
import { RoleModulePermissionEntity } from "./role-module-permission.entity";
import { UserEntity } from "./user.entity";


/** 
 * A `RoleEntity` has a `roleName` and a `roleDescription`, and it has many `UserEntitys`
 * 
 * @author Carlos Páez
 */
@Entity({ name: `roles` })
export class RoleEntity extends BaseEntity {
    @Column({ unique: true, nullable: false })
    roleName!: string

    @Column({ nullable: true })
    roleDescription!: string

    @OneToMany(() => UserEntity, (user) => user.role, { cascade: true })
    users!: UserEntity[]

    @OneToMany(() => RoleModulePermissionEntity, (roleModulePermission) => roleModulePermission.role, { cascade: true })
    rolesModulesPermissions!: RoleModulePermissionEntity[]
}