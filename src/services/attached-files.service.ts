import { BaseService } from "../config";
import { AttachedFilesDTO } from "../dtos";
import { AttachedFilesEntity } from "../models";
import { DeleteResult, In, UpdateResult } from 'typeorm';


export class AttachedFilesService extends BaseService<AttachedFilesEntity> {
    private PUBLIC_URL = this.getEnvironment('PUBLIC_URL')
    private PORT = this.getEnvironment('PORT')

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
            .orderBy(`attachedFiles.publicFilename`, (order === 'ASC') ? 'ASC' : 'DESC')
            .where(`attachedFiles.deletedAt IS NOT NULL`)
            .withDeleted()
            .getManyAndCount()
    }

    public async findAttachedFilesByIds(arrayIds: string[]): Promise<AttachedFilesEntity[]> {
        return (await this.execRepository).findBy({ id: In(arrayIds) })
    }

    public async searchAttachedFiles(publicFilename: string, mimetype: string): Promise<[AttachedFilesEntity[], number]> {
        return (await this.execRepository)
            .createQueryBuilder(`attachedFiles`)
            .where(`MATCH(attachedFiles.publicFilename) AGAINST ('${publicFilename}' IN BOOLEAN MODE)`)
            .orWhere(`MATCH(attachedFiles.mimetype) AGAINST ('${mimetype}' IN BOOLEAN MODE)`)
            .withDeleted()
            .getManyAndCount()
    }

    public async findOneAttachedFileById(id: string, deleted = false): Promise<AttachedFilesEntity | null> {
        return (await this.execRepository).findOne({
            where: { id },
            withDeleted: (deleted) ? true : false
        })
    }

    public async findInternalNameById(id: string): Promise<AttachedFilesEntity | null> {
        return (await this.execRepository).findOne({
            where: { id },
            withDeleted: true,
            select: { internalFilename: true, mimetype: true }
        })
    }

    public async uploadAttachedFile(body: AttachedFilesDTO): Promise<AttachedFilesEntity> {
        const newFile = (await this.execRepository).create(body)
        newFile.id = newFile.internalFilename.split('.')[0]
        const fileLocation = `${this.PUBLIC_URL}:${this.PORT}/api/v1/attached-files/download/${newFile.id}`
        return (await this.execRepository).save({ ...newFile, fileLocation })
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

    public async attachedFileIsEnabled(id: string): Promise<AttachedFilesEntity | null> {
        return (await this.execRepository).findOne({
            where: { id, deletedAt: undefined },
            select: { id: true }
        })
    }
}