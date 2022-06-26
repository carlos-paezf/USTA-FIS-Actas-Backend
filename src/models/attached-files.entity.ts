import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../config";
import { MeetingMinutesEntity } from './meeting-minutes.entity';


@Entity({ name: `attached_files` })
export class AttachedFilesEntity extends BaseEntity {
    @ManyToOne(() => MeetingMinutesEntity, (meetingMinutes) => meetingMinutes.attachedFiles)
    @JoinColumn({ name: 'meeting_minutes_id' })
    meetingMinutes!: MeetingMinutesEntity

    @Column()
    internalFilename!: string

    @Column()
    publicFilename!: string

    @Column()
    fileLocation!: string

    @Column()
    author!: string
}