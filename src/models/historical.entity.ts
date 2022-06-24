import { Column, Entity } from "typeorm";
import { ModuleEntity } from "./module.entity";
import { PermissionEntity } from "./permission.entity";
import { RoleEntity } from "./role.entity";
import { UserEntity } from "./user.entity";
import { BaseEntity } from '../config/base.entity';


/**
 * A RecordEntity is a record of a user's interaction with a module and permission. 
 *
 * @author Carlos Páez
 */
@Entity({ name: `historical` })
export class HistoricalEntity extends BaseEntity {
    @Column({ nullable: false })
    responseStatusCode!: number

    @Column({ name: `user_id` })
    user!: string

    @Column({ name: `role_id` })
    role!: string

    @Column({ name: `module_id` })
    module!: string

    @Column({ name: `permission_id` })
    permission!: string
}