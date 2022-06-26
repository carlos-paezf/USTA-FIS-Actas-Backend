import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
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
    @Column()
    nameActivity!: string

    @ManyToOne(() => MeetingMinutesEntity, (meetingMinutes) => meetingMinutes.commitments)
    @JoinColumn({ name: `meeting_minutes_id` })
    meetingMinutes!: MeetingMinutesEntity

    @ManyToOne(() => UserEntity, (user) => user.activity)
    @JoinColumn({ name: `responsible_user_id` })
    responsibleUser!: UserEntity

    @Column({ type: 'timestamp' })
    activityDate!: Date

    @Column({ type: 'enum', enum: FulfillmentType, nullable: false, default: FulfillmentType.NO })
    fulfillment!: FulfillmentType

    @OneToMany(() => ObservationEntity, (observation) => observation.activity, { cascade: true })
    observations!: ObservationEntity[]
}
