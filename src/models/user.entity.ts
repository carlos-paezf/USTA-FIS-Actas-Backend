import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config";
import { ActivityEntity } from "./activity.entity";
import { MeetingMinutesEntity } from "./meeting-minutes.entity";
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

    @Column()
    position!: string

    @ManyToOne(() => RoleEntity, (role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role!: RoleEntity

    @OneToMany(() => ActivityEntity, (activity) => activity.responsibleUser)
    activity!: ActivityEntity

    @OneToMany(() => MeetingMinutesEntity, (activity) => activity.createdBy)
    meetingMinutesCreated!: MeetingMinutesEntity

    @OneToMany(() => MeetingMinutesEntity, (activity) => activity.reviewedBy)
    meetingMinutesReviewed!: MeetingMinutesEntity

    @ManyToMany(() => MeetingMinutesEntity, (meetingMinutes) => meetingMinutes.summoned)
    summoned!: UserEntity[]

    @ManyToMany(() => MeetingMinutesEntity, (meetingMinutes) => meetingMinutes.absent)
    absent!: UserEntity[]

    @ManyToMany(() => MeetingMinutesEntity, (meetingMinutes) => meetingMinutes.guest)
    guest!: UserEntity[]
}