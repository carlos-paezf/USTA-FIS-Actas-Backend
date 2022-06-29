import { AttachedFilesService } from "../services";
import { SharedMiddleware } from "../shared/middlewares/shared.middleware";


export class AttachedFilesMiddleware extends SharedMiddleware<AttachedFilesService> {
    constructor() {
        super(AttachedFilesService)
    }
}