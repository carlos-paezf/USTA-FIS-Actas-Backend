import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config";
import { ObservationDTO } from "../dtos";
import { ObservationEntity } from "../models";


export class ObservationService extends BaseService<ObservationEntity> {
    constructor() {
        super(ObservationEntity)
    }

    public async findAllObservationsByActivityId(activityId: string): Promise<[ObservationEntity[], number]> {
        return (await this.execRepository)
            .createQueryBuilder(`observation`)
            .where(`observation.activity = :activityId`, { activityId })
            .leftJoin(`observation.activity`, `activity`)
            .getManyAndCount()
    }

    public async createObservation(body: ObservationDTO): Promise<ObservationEntity> {
        return (await this.execRepository).save(body)
    }

    public async updateObservationById(id: string, infoUpdate: ObservationDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { ...infoUpdate, updatedAt: new Date() })
    }

    public async softDeleteObservationById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).softDelete(id)
    }

    public async restoreObservationById(id: string): Promise<UpdateResult> {
        return (await this.execRepository).restore(id)
    }

    public async destroyObservationById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete(id)
    }
}