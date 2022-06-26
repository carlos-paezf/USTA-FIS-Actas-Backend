import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
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

    @ManyToMany(() => UserEntity)
    @JoinColumn()
    summoned!: UserEntity[]

    @ManyToMany(() => UserEntity)
    @JoinColumn()
    absent!: UserEntity[]

    @ManyToMany(() => UserEntity)
    @JoinColumn()
    guest!: UserEntity[]

    @OneToMany(() => SubjectAgendaItemEntity, (item) => item.meetingMinutes, { cascade: true })
    agendaSubjectItems!: SubjectAgendaItemEntity[]

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
}