import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseEntity } from "../config";
import { MeetingMinutesEntity } from "./meeting-minutes.entity";


export enum OrganizationType {
    ORGANIZATION = `ORGANIZATION`,
    COMMITTEE = `COMMITTEE`,
    AREA = `AREA`,
    PROGRAM = `PROGRAM`
}


@Entity({ name: `organization` })
export class OrganizationEntity extends BaseEntity {
    @Column({ type: `enum`, enum: OrganizationType, nullable: false, default: OrganizationType.COMMITTEE })
    organizationType!: OrganizationType

    @Index({ fulltext: true })
    @Column()
    organizationName!: string

    @OneToMany(() => MeetingMinutesEntity, (meetingMinutes) => meetingMinutes.organizationCommitteeAreaProgram, { cascade: true })
    meetingMinutes!: MeetingMinutesEntity
}