import { red } from "colors";

import { BaseService } from "../config";
import { CustomError } from "../helpers/custom-error.helper";
import { ObservationEntity } from "../models";


export class ObservationService extends BaseService<ObservationEntity> {
    constructor() {
        super(ObservationEntity)
    }

    // eslint-disable-next-line
    public async removeRelationship(observation: ObservationEntity, columnRelation: string): Promise<void> {
        try {
            const relationship = (await this.execRepository)
                .createQueryBuilder()
                .relation(ObservationEntity, columnRelation)
                .of(observation)
                .loadMany();

            (await this.execRepository)
                .createQueryBuilder()
                .relation(ObservationEntity, columnRelation)
                .of(observation)
                .remove(await relationship);
            // eslint-disable-next-line
        } catch (error: any) {
            console.log(red(`Error in MeetingMinutesService:addAndRemoveRelationship: `), error)
            throw new CustomError(`RemoveRelationship`, error.message, `RemoveRelationship`)
        }
    }

    public async destroyNullObservations() {
        const observationsNull = await (
            (await this.execRepository)
                .createQueryBuilder(`observation`)
                .where(`observation.activity IS NULL`)
                .getMany()
        )

        for (const observation of observationsNull) {
            await this.removeRelationship(observation, `activity`)
        }

        return (await this.execRepository)
            .createQueryBuilder()
            .where(`activity IS NULL`)
            .delete()
            .execute()
    }
}