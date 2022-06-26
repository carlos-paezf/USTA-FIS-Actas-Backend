import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../config";
import { ActivityEntity } from "./activity.entity";


@Entity({ name: `observation` })
export class ObservationEntity extends BaseEntity {
    @ManyToOne(() => ActivityEntity, (activity) => activity.observations)
    @JoinColumn({ name: `activity_id` })
    activity!: ActivityEntity

    @Column({ type: 'text' })
    observation!: string
}