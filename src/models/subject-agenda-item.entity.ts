import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../config";
import { MeetingMinutesEntity } from "./meeting-minutes.entity";


@Entity({ name: `subject_agenda_item` })
export class SubjectAgendaItemEntity extends BaseEntity {
    @ManyToOne(() => MeetingMinutesEntity, (meetingMinutes) => meetingMinutes.subjectAgendaItems)
    @JoinColumn({ name: 'meeting_minutes_id' })
    meetingMinutes!: MeetingMinutesEntity

    @Column()
    itemNumber!: number

    @Index({ fulltext: true })
    @Column({ type: 'text' })
    itemContent!: string

    @Index({ fulltext: true })
    @Column({ type: 'text' })
    itemDevelopment!: string
}