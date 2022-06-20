import { Exclude } from "class-transformer";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "../config";
import { RoleType } from "../dtos";


@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @Column()
    name!: string

    @Column()
    lastName!: string

    @Column({ length: 15, nullable: false })
    username!: string

    @Column({ nullable: false })
    email!: string

    @Exclude()
    @Column({ select: false, nullable: false })
    password!: string

    @Column({ type: 'enum', enum: RoleType, nullable: false, default: RoleType.PROFESSOR })
    role!: RoleType
}