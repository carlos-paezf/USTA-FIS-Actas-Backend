import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config";
import { ActivityEntity } from "./activity.entity";
import { AttachedFilesEntity } from "./attached-files.entity";
import { SubjectAgendaItemEntity } from "./subject-agenda-item.entity";
import { UserEntity } from "./user.entity";


@Entity({ name: `meeting_minutes` })
export class MeetingMinutesEntity extends BaseEntity {
    @Column()
    numberMeetingMinutes!: number

    @Column({ default: true })
    isRegular!: boolean

    @Column()
    organismCommitteeAreaProgram!: string

    @Column()
    meetingPlace!: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    meetingDate!: Date

    @Column()
    startTime!: string

    @Column()
    endingTime!: string

    @OneToMany(() => SubjectAgendaItemEntity, (item) => item.meetingMinutes, { cascade: true })
    subjectAgendaItems!: SubjectAgendaItemEntity[]

    @OneToMany(() => ActivityEntity, (activity) => activity.meetingMinutes, { cascade: true })
    commitments!: ActivityEntity[]

    @OneToMany(() => AttachedFilesEntity, (attached) => attached.meetingMinutes)
    attachedFiles!: AttachedFilesEntity[]

    @ManyToOne(() => UserEntity, (user) => user.meetingMinutesCreated)
    @JoinColumn({ name: `produced_by_id` })
    createdBy!: UserEntity

    @ManyToOne(() => UserEntity, (user) => user.meetingMinutesReviewed)
    @JoinColumn({ name: `reviewed_by_id` })
    reviewedBy!: UserEntity

    @ManyToMany(() => UserEntity, (user) => user.summoned)
    @JoinTable({
        name: 'meeting_minutes_summoned',
        joinColumn: {
            name: `meeting_minutes_id`
        },
        inverseJoinColumn: {
            name: `user_id`
        }
    })
    summoned!: UserEntity[]

    @ManyToMany(() => UserEntity, (user) => user.absent)
    @JoinTable({
        name: 'meeting_minutes_absent',
        joinColumn: {
            name: `meeting_minutes_id`
        },
        inverseJoinColumn: {
            name: `user_id`
        }
    })
    absent!: UserEntity[]

    @ManyToMany(() => UserEntity, (user) => user.guest)
    @JoinTable({
        name: 'meeting_minutes_guest',
        joinColumn: {
            name: `meeting_minutes_id`
        },
        inverseJoinColumn: {
            name: `user_id`
        }
    })
    guest!: UserEntity[]
}