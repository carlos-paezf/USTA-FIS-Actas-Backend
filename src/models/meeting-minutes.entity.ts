import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config";
import { ActivityEntity } from "./activity.entity";
import { AttachedFilesEntity } from "./attached-files.entity";
import { OrganizationEntity } from "./organization.entity";
import { SubjectAgendaItemEntity } from "./subject-agenda-item.entity";
import { UserEntity } from "./user.entity";


@Entity({ name: `meeting_minutes` })
export class MeetingMinutesEntity extends BaseEntity {
    @Column()
    numberMeetingMinutes!: number

    @Column({ default: true })
    isRegular!: boolean

    @ManyToOne(() => OrganizationEntity, (organization) => organization.meetingMinutes)
    @JoinColumn({ name: `organization_committee_area_program` })
    organizationCommitteeAreaProgram!: OrganizationEntity

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

    @ManyToOne(() => UserEntity, (user) => user.meetingMinutesCreated)
    @JoinColumn({ name: `produced_by_id` })
    createdBy!: UserEntity

    @ManyToOne(() => UserEntity, (user) => user.meetingMinutesReviewed)
    @JoinColumn({ name: `reviewed_by_id` })
    reviewedBy!: UserEntity

    @ManyToMany(() => UserEntity, (user) => user.summonedToMeetingMinutes)
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

    @ManyToMany(() => UserEntity, (user) => user.absentToMeetingMinutes)
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

    @ManyToMany(() => UserEntity, (user) => user.guestToMeetingMinutes)
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

    @ManyToMany(() => AttachedFilesEntity, (attached) => attached.meetingMinutes)
    @JoinTable({
        name: `meeting_minutes_attached_files`,
        joinColumn: {
            name: `meeting_minutes_id`
        },
        inverseJoinColumn: {
            name: `attached_file_id`
        }
    })
    attachedFiles!: AttachedFilesEntity[]
}