import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../config";
import { ActivityEntity } from "../models";


export class ObservationDTO extends BaseDTO {
    @IsNotEmpty()
    activity!: ActivityEntity

    @IsNotEmpty()
    observation!: string
}