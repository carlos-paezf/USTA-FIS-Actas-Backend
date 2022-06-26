import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../config";
import { MeetingMinutesEntity } from "./meeting-minutes.entity";


@Entity({ name: `subject_agenda_item` })
export class SubjectAgendaItem extends BaseEntity {
    @ManyToOne(() => MeetingMinutesEntity, (meetingMinutes) => meetingMinutes.agendaSubjectItems)
    @JoinColumn({ name: 'meeting_minutes_id' })
    meetingMinutes!: MeetingMinutesEntity

    @Column()
    itemNumber!: number

    @Column({ type: 'text' })
    itemContent!: string

    @Column({ type: 'text' })
    itemDevelopment!: string
}