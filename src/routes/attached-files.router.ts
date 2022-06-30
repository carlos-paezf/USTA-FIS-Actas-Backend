import { BaseRouter } from "../config";
import { AttachedFilesController } from "../controllers";
import { ModulesID, PermissionsID } from "../helpers/enums.helper";
import { AttachedFilesMiddleware } from "../middlewares";


export class AttachedFilesRouter extends BaseRouter<AttachedFilesController, AttachedFilesMiddleware> {
    constructor() {
        super(AttachedFilesController, AttachedFilesMiddleware)
    }

    protected routes(): void {
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

        this.router.post(
            `/attached-files`,
            [
                this.middleware.validateJWT,
                this.middleware.checkRoleModulePermission(ModulesID.ATTACHED_FILES, PermissionsID.CREATE),
                this.middleware.uploadFilesMiddleware
            ],
            this.controller.uploadAttachedFiles
        )
    }
}