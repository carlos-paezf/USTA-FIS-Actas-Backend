import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config";
import { MeetingMinutesEntity } from "./meeting-minutes.entity";
import { ObservationEntity } from "./observation.entity";
import { UserEntity } from './user.entity';


export enum FulfillmentType {
    YES = 'Yes',
    NO = 'No',
    IN_PROCESS = 'In Process'
}


@Entity({ name: `activity` })
export class ActivityEntity extends BaseEntity {
    @Index({ fulltext: true })
    @Column({ type: 'text' })
    nameActivity!: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    activityDate!: Date

    @Column({ type: 'enum', enum: FulfillmentType, nullable: false, default: FulfillmentType.NO })
    fulfillment!: FulfillmentType

    @OneToMany(() => ObservationEntity, (observation) => observation.activity, { cascade: true })
    observations!: ObservationEntity[]

    @ManyToMany(() => UserEntity, (user) => user.activities)
    @JoinTable({
        name: `activity_user`,
        joinColumn: {
            name: `activity_id`
        },
        inverseJoinColumn: {
            name: `user_id`
        }
    })
    responsibleUsers!: UserEntity[]

    @ManyToOne(() => MeetingMinutesEntity, (meetingMinutes) => meetingMinutes.commitments)
    @JoinColumn({ name: `meeting_minutes_id` })
    meetingMinutes!: MeetingMinutesEntity
}
