import { BaseRouter } from "../config";
import { OrganizationController } from "../controllers";
import { OrganizationMiddleware } from "../middlewares";


export class OrganizationRouter extends BaseRouter<OrganizationController, OrganizationMiddleware> {
    constructor() {
        super(OrganizationController, OrganizationMiddleware)
    }

    protected routes(): void {
        this.router.param(`id`, this.middleware.idParamValidator)

        this.router.get(
            `/organizations`,
            [],
            this.controller.findAllOrganizations
        )

        this.router.get(
            `/organizations/search=:name`,
            [],
            this.controller.searchOrganizationsByName
        )

        this.router.get(
            `/organizations/:id`,
            [],
            this.controller.findOneOrganizationById
        )

        this.router.get(
            `/organizations/:name`,
            [],
            this.controller.findOneOrganizationByName
        )

        this.router.post(
            `/organizations`,
            [],
            this.controller.saveOrganization
        )

        this.router.put(
            `/organizations/:id`,
            [],
            this.controller.updateOrganizationById
        )

        this.router.param(`idDisabled`, this.middleware.idDisabledValidator)
        this.router.patch(
            `/organizations/disabled/:idDisabled`,
            [],
            this.controller.softDeleteOrganizationById
        )

        this.router.param(`idRestore`, this.middleware.idRestoreValidator)
        this.router.patch(
            `/organizations/restore/:idRestore`,
            [],
            this.controller.restoreOrganizationById
        )

        this.router.delete(
            `/organizations/destroy/:idDestroy`,
            [],
            this.controller.destroyOrganizationById
        )
    }
}