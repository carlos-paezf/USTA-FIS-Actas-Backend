import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../config";
import { MeetingMinutesEntity } from './meeting-minutes.entity';
import { UserEntity } from "./user.entity";


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
    mimetype!: string

    @Column()
    size!: number

    @ManyToOne(() => UserEntity, (user) => user.attachedFiles)
    @JoinColumn({ name: `user_id` })
    author!: UserEntity

    @ManyToMany(() => MeetingMinutesEntity, (meetingMinutes) => meetingMinutes.attachedFiles)
    meetingMinutes!: MeetingMinutesEntity[]
}