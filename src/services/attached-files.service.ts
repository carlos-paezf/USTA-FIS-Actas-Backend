import { BaseService } from "../config";
import { AttachedFilesDTO } from "../dtos";
import { AttachedFilesEntity } from "../models";
import { DeleteResult, UpdateResult } from 'typeorm';


export class AttachedFilesService extends BaseService<AttachedFilesEntity> {
    constructor() {
        super(AttachedFilesEntity)
    }

    public async findAllAttachedFiles(): Promise<[AttachedFilesEntity[], number]> {
        return (await this.execRepository).findAndCount()
    }

    public async findOneAttachedFileById(id: string): Promise<AttachedFilesEntity | null> {
        return (await this.execRepository).findOne({
            where: { id }
        })
    }

    public async uploadAttachedFile(body: AttachedFilesDTO): Promise<AttachedFilesEntity> {
        return (await this.execRepository).save(body)
    }

    public async softDeleteAttachedFileById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).softDelete(id)
    }

    public async restoreAttachedFileById(id: string): Promise<UpdateResult> {
        return (await this.execRepository).restore(id)
    }

    public async destroyAttachedFileById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete(id)
    }
}