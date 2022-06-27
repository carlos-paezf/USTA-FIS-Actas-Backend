import { MeetingMinutesService } from "../services";
import { SharedMiddleware } from "../shared/middlewares/shared.middleware";


export class MeetingMinutesMiddleware extends SharedMiddleware<MeetingMinutesService> {
    constructor() {
        super(MeetingMinutesService)
    }
}