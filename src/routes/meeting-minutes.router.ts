import { BaseRouter } from "../config";
import { MeetingMinutesController } from "../controllers";
import { MeetingMinutesMiddleware } from "../middlewares";


export class MeetingMinutesRouter extends BaseRouter<MeetingMinutesController, MeetingMinutesMiddleware> {
    constructor() {
        super(MeetingMinutesController, MeetingMinutesMiddleware)
    }

    protected routes(): void {
        this.router.get(
            '/meeting-minutes',
            [],
            this.controller.findAllMeetingMinutes
        )

        this.router.get(
            '/meeting-minutes/:id',
            [],
            this.controller.findOneMeetingMinutesById
        )

        this.router.post(
            '/meeting-minutes',
            [],
            this.controller.createMeetingMinutes
        )
    }
}