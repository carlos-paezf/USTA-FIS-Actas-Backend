import { BaseRouter } from "../config";
import { MeetingMinutesController } from "../controllers";
import { ModulesID, PermissionsID } from '../helpers/enums.helper';
import { MeetingMinutesMiddleware } from "../middlewares";


export class MeetingMinutesRouter extends BaseRouter<MeetingMinutesController, MeetingMinutesMiddleware> {
    constructor() {
        super(MeetingMinutesController, MeetingMinutesMiddleware)
    }

    protected routes(): void {
        this.router.param('id', this.middleware.idParamValidator)

        this.router.get(
            '/meeting-minutes',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.MINUTES_OF_MEETING, PermissionsID.READ)
            ],
            this.controller.findAllMeetingMinutes
        )

        this.router.get(
            '/meeting-minutes/:id',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.MINUTES_OF_MEETING, PermissionsID.READ)
            ],
            this.controller.findOneMeetingMinutesById
        )

        this.router.post(
            '/meeting-minutes',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.MINUTES_OF_MEETING, PermissionsID.CREATE),
                this.middleware.meetingMinutesValidator
            ],
            this.controller.createMeetingMinutes
        )

        this.router.put(
            '/meeting-minutes/:id',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.MINUTES_OF_MEETING, PermissionsID.UPDATE),
                this.middleware.meetingMinutesValidator
            ],
            this.controller.updateMeetingMinutesById
        )

        this.router.param('idDisabled', this.middleware.idDisabledValidator)

        this.router.patch(
            `/meeting-minutes/disabled/:idDisabled`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.MINUTES_OF_MEETING, PermissionsID.SOFT_DELETE)
            ],
            this.controller.softDeleteMeetingMinutesById
        )

        this.router.param('idRestore', this.middleware.idRestoreValidator)

        this.router.patch(
            `/meeting-minutes/restore/:idRestore`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.MINUTES_OF_MEETING, PermissionsID.RESTORE)
            ],
            this.controller.restoreMeetingMinutesById
        )

        this.router.delete(
            `/meeting-minutes/destroy/:id`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.MINUTES_OF_MEETING, PermissionsID.HARD_DELETE)
            ],
            this.controller.destroyMeetingMinutesById
        )
    }
}