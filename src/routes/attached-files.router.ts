import { BaseRouter } from "../config";
import { AttachedFilesController } from "../controllers";
import { ModulesID, PermissionsID } from "../helpers/enums.helper";
import { AttachedFilesMiddleware } from "../middlewares";


export class AttachedFilesRouter extends BaseRouter<AttachedFilesController, AttachedFilesMiddleware> {
    constructor() {
        super(AttachedFilesController, AttachedFilesMiddleware)
    }

    protected routes(): void {
        this.router.param('id', this.middleware.idParamValidator)

        this.router.get(
            `/attached-files`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ATTACHED_FILES, PermissionsID.READ)
            ],
            this.controller.findAllAttachedFiles
        )

        this.router.get(
            `/attached-files/deleted`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ATTACHED_FILES, PermissionsID.READ)
            ],
            this.controller.findAllDeletedAttachedFiles
        )

        this.router.get(
            `/attached-files/search`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ATTACHED_FILES, PermissionsID.READ)
            ],
            this.controller.searchAttachedFiles
        )

        this.router.get(
            `/attached-files/:id`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ATTACHED_FILES, PermissionsID.READ)
            ],
            this.controller.findOneAttachedFileById
        )

        this.router.get(
            `/attached-files/download/:id`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ATTACHED_FILES, PermissionsID.READ)
            ],
            this.controller.downloadAttachedFile
        )

        this.router.post(
            `/attached-files`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ATTACHED_FILES, PermissionsID.CREATE),
                this.middleware.uploadFilesMiddleware
            ],
            this.controller.uploadAttachedFiles
        )

        this.router.param('idDisabled', this.middleware.idDisabledValidator)

        this.router.patch(
            `/attached-files/disabled/:idDisabled`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ATTACHED_FILES, PermissionsID.SOFT_DELETE)
            ],
            this.controller.softDeleteAttachedFileById
        )

        this.router.param('idRestore', this.middleware.idRestoreValidator)

        this.router.patch(
            `/attached-files/restore/:idRestore`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ATTACHED_FILES, PermissionsID.RESTORE)
            ],
            this.controller.restoreAttachedFileById
        )


        this.router.delete(
            `/attached-files/destroy/:id`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ATTACHED_FILES, PermissionsID.HARD_DELETE)
            ],
            this.controller.destroyAttachedFileById
        )
    }
}