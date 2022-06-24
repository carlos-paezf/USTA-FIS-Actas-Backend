import { BaseRouter } from '../config';
import { HistoricalController } from '../controllers/historical.controller';
import { ModulesID, PermissionsID } from '../helpers/enums.helper';
import { HistoricalMiddleware } from '../middlewares/historical.middleware';


export class HistoricalRouter extends BaseRouter<HistoricalController, HistoricalMiddleware> {

    constructor() {
        super(HistoricalController, HistoricalMiddleware)
    }

    protected routes(): void {
        this.router.param('id', this.middleware.idParamValidator)

        this.router.get(
            '/historical',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.HISTORICAL, PermissionsID.READ),
            ],
            this.controller.findAllMoves
        )

        this.router.get(
            '/historical/move/:id',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.HISTORICAL, PermissionsID.READ),
            ],
            this.controller.findMoveById
        )

        this.router.get(
            '/historical/user/:userId',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.HISTORICAL, PermissionsID.READ),
            ],
            this.controller.findMovesByUser
        )

        this.router.get(
            '/historical/rejected-moves',
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.HISTORICAL, PermissionsID.READ),
            ],
            this.controller.findRejectedMoves
        )
    }
}