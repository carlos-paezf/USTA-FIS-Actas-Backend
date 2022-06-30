import { Exclude } from "class-transformer";
import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config";
import { ActivityEntity } from "./activity.entity";
import { MeetingMinutesEntity } from "./meeting-minutes.entity";
import { RoleEntity } from "./role.entity";
import { AttachedFilesEntity } from './attached-files.entity';


/** 
 * The `UserEntity` class is a TypeScript class that extends the BaseEntity class. 
 * It has a bunch of properties, some of which are decorated with 
 * @Column, @Exclude, @ManyToOne, and @JoinColumn.
 * 
 * @author Carlos Páez
 */
@Entity({ name: `users` })
export class UserEntity extends BaseEntity {
    @Index({ fulltext: true })
    @Column()
    name!: string

    @Index({ fulltext: true })
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

    @OneToMany(() => MeetingMinutesEntity, (activity) => activity.createdBy)
    meetingMinutesCreated!: MeetingMinutesEntity

    @OneToMany(() => MeetingMinutesEntity, (activity) => activity.reviewedBy)
    meetingMinutesReviewed!: MeetingMinutesEntity

    @OneToMany(() => AttachedFilesEntity, (files) => files.author)
    attachedFiles!: AttachedFilesEntity[]

    @ManyToMany(() => MeetingMinutesEntity, (meetingMinutes) => meetingMinutes.summoned)
    summonedToMeetingMinutes!: MeetingMinutesEntity[]

    @ManyToMany(() => MeetingMinutesEntity, (meetingMinutes) => meetingMinutes.absent)
    absentToMeetingMinutes!: MeetingMinutesEntity[]

    @ManyToMany(() => MeetingMinutesEntity, (meetingMinutes) => meetingMinutes.guest)
    guestToMeetingMinutes!: MeetingMinutesEntity[]

    @ManyToMany(() => ActivityEntity, (activity) => activity.responsibleUsers)
    activities!: ActivityEntity[]
}