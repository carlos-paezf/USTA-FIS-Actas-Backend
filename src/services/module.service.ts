import { UpdateResult, DeleteResult } from 'typeorm';
import { BaseService } from "../config";
import { ModuleDTO } from "../dtos";
import { ModuleEntity } from "../models";


export class ModuleService extends BaseService<ModuleEntity> {
    constructor() {
        super(ModuleEntity)
    }

    public async findAllModules(from: number, limit: number, all: boolean, order: string): Promise<[ModuleEntity[], number]> {
        return (await this.execRepository).findAndCount({
            skip: from,
            take: limit,
            order: { moduleName: (order === 'ASC') ? 'ASC' : 'DESC' },
            withDeleted: all ? true : false
        })
    }

    public async findOneModuleById(id: string): Promise<ModuleEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }

    public async findOneModuleByIdIncludeDeleted(id: string): Promise<ModuleEntity | null> {
        return (await this.execRepository).findOne({
            where: { id },
            withDeleted: true
        })
    }

    public async findOneModuleByName(moduleName: string): Promise<ModuleEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('module')
            .addSelect(`module.moduleName`)
            .where({ moduleName })
            .withDeleted()
            .getOne()
    }

    public async createModule(body: ModuleDTO): Promise<ModuleEntity> {
        return (await this.execRepository).save(body)
    }

    public async updateModuleById(id: string, infoUpdate: ModuleDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { ...infoUpdate, updatedAt: new Date() })
    }

    public async softDeleteModuleById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).softDelete(id)
    }

    public async restoreModuleById(id: string): Promise<UpdateResult> {
        return (await this.execRepository).restore(id)
    }

    public async destroyModuleById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete(id)
    }

    public async moduleIsEnabled(id: string): Promise<ModuleEntity | null> {
        return (await this.execRepository).findOne({
            where: { id, deletedAt: undefined },
            select: { id: true }
        })
    }
}