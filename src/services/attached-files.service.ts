import { BaseService } from "../config";
import { AttachedFilesDTO } from "../dtos";
import { AttachedFilesEntity } from "../models";
import { DeleteResult, UpdateResult } from 'typeorm';


export class AttachedFilesService extends BaseService<AttachedFilesEntity> {
    constructor() {
        super(AttachedFilesEntity)
    }

    public async findAllAttachedFiles(from: number, limit: number, order: string, all: boolean): Promise<[AttachedFilesEntity[], number]> {
        return (await this.execRepository).findAndCount({
            skip: from,
            take: limit,
            order: { publicFilename: (order === 'ASC') ? 'ASC' : 'DESC' },
            withDeleted: (all) ? true : false
        })
    }

    public async findAllDeletedAttachedFiles(from: number, limit: number, order: string): Promise<[AttachedFilesEntity[], number]> {
        return (await this.execRepository)
            .createQueryBuilder(`attachedFiles`)
            .skip(from).take(limit)
            .orderBy(`attachedFiles`, (order === 'ASC') ? 'ASC' : 'DESC')
            .where(`attachedFiles.deletedAt IS NOT NULL`)
            .withDeleted()
            .getManyAndCount()
    }

    public async searchAttachedFiles(filename: string, author: string): Promise<[AttachedFilesEntity[], number]> {
        return (await this.execRepository)
            .createQueryBuilder(`attachedFiles`)
            .where(`MATCH(attachedFiles.publicFilename) AGAINST ('${filename}' IN BOOLEAN MODE)`)
            .where(`MATCH(attachedFiles.author) AGAINST ('${author}' IN BOOLEAN MODE)`)
            .withDeleted()
            .getManyAndCount()
    }

    public async findOneAttachedFileById(id: string, deleted: boolean): Promise<AttachedFilesEntity | null> {
        return (await this.execRepository).findOne({
            where: { id },
            withDeleted: (deleted) ? true : false
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