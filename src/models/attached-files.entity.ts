import { Column, Entity, Index, ManyToMany } from "typeorm";
import { BaseEntity } from "../config";
import { MeetingMinutesEntity } from './meeting-minutes.entity';


@Entity({ name: `attached_files` })
export class AttachedFilesEntity extends BaseEntity {
    @Column()
    internalFilename!: string

    @Index({ fulltext: true })
    @Column()
    publicFilename!: string

    @Column()
    fileLocation!: string

    @Index({ fulltext: true })
    @Column()
    author!: string

    @ManyToMany(() => MeetingMinutesEntity, (meetingMinutes) => meetingMinutes.attachedFiles)
    meetingMinutes!: MeetingMinutesEntity[]
}