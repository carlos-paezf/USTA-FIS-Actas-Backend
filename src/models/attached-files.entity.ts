import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "../config";
import { MeetingMinutesEntity } from './meeting-minutes.entity';


@Entity({ name: `attached_files` })
export class AttachedFilesEntity extends BaseEntity {
    @Column()
    internalFilename!: string

    @Column()
    publicFilename!: string

    @Column()
    fileLocation!: string

    @Column()
    author!: string

    @ManyToMany(() => MeetingMinutesEntity, (meetingMinutes) => meetingMinutes.attachedFiles)
    meetingMinutes!: MeetingMinutesEntity[]
}