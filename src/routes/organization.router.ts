import { BaseRouter } from "../config";
import { OrganizationController } from "../controllers";
import { ModulesID, PermissionsID } from "../helpers/enums.helper";
import { OrganizationMiddleware } from "../middlewares";


export class OrganizationRouter extends BaseRouter<OrganizationController, OrganizationMiddleware> {
    constructor() {
        super(OrganizationController, OrganizationMiddleware)
    }

    protected routes(): void {
        this.router.param(`id`, this.middleware.idParamValidator)

        this.router.get(
            `/organizations`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ORGANIZATIONS, PermissionsID.READ)
            ],
            this.controller.findAllOrganizations
        )

        this.router.get(
            `/organizations/deleted`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ORGANIZATIONS, PermissionsID.READ)
            ],
            this.controller.findAllDeletedOrganizations
        )

        this.router.get(
            `/organizations/search`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ORGANIZATIONS, PermissionsID.READ)
            ],
            this.controller.searchOrganizationsByName
        )

        this.router.get(
            `/organizations/:id`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ORGANIZATIONS, PermissionsID.READ)
            ],
            this.controller.findOneOrganizationById
        )

        this.router.post(
            `/organizations`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ORGANIZATIONS, PermissionsID.CREATE),
                this.middleware.organizationNameValidator,
                this.middleware.organizationValidator
            ],
            this.controller.saveOrganization
        )

        this.router.put(
            `/organizations/:id`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ORGANIZATIONS, PermissionsID.UPDATE),
                this.middleware.organizationNameValidator,
                this.middleware.organizationValidator
            ],
            this.controller.updateOrganizationById
        )

        this.router.param(`idDisabled`, this.middleware.idDisabledValidator)
        this.router.patch(
            `/organizations/disabled/:idDisabled`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ORGANIZATIONS, PermissionsID.SOFT_DELETE)
            ],
            this.controller.softDeleteOrganizationById
        )

        this.router.param(`idRestore`, this.middleware.idRestoreValidator)
        this.router.patch(
            `/organizations/restore/:idRestore`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ORGANIZATIONS, PermissionsID.RESTORE)
            ],
            this.controller.restoreOrganizationById
        )

        this.router.delete(
            `/organizations/destroy/:idDestroy`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ORGANIZATIONS, PermissionsID.HARD_DELETE)
            ],
            this.controller.destroyOrganizationById
        )
    }
}