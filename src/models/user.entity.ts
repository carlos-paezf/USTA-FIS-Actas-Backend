import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../config";
import { PositionType } from "../dtos";
import { RoleEntity } from "./role.entity";


/** 
 * The `UserEntity` class is a TypeScript class that extends the BaseEntity class. 
 * It has a bunch of properties, some of which are decorated with 
 * @Column, @Exclude, @ManyToOne, and @JoinColumn.
 * 
 * @author Carlos Páez
 */
@Entity({ name: `users` })
export class UserEntity extends BaseEntity {
    @Column()
    name!: string

    @Column()
    lastName!: string

    @Column({ length: 15, nullable: false, unique: true })
    username!: string

    @Column({ nullable: false, unique: true })
    email!: string

    @Exclude()
    @Column({ select: false, nullable: false })
    password!: string

    @Column({ type: 'enum', enum: PositionType, nullable: false, default: PositionType.PROFESSOR })
    position!: PositionType

    @ManyToOne(() => RoleEntity, (role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role!: RoleEntity
}