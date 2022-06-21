import { UpdateResult, DeleteResult } from 'typeorm';
import { BaseService } from "../config";
import { PermissionDTO } from "../dtos";
import { PermissionEntity } from "../models";


export class PermissionService extends BaseService<PermissionEntity> {
    constructor() {
        super(PermissionEntity)
    }

    public async findAllPermissions(from: number, limit: number, all: boolean, order: string): Promise<[PermissionEntity[], number]> {
        return (await this.execRepository).findAndCount({
            skip: from,
            take: limit,
            order: { permissionName: (order === 'ASC') ? 'ASC' : 'DESC' },
            withDeleted: all ? true : false
        })
    }

    public async findOnePermissionById(id: string): Promise<PermissionEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }

    public async findOnePermissionByIdIncludeDeleted(id: string): Promise<PermissionEntity | null> {
        return (await this.execRepository).findOne({
            where: { id },
            withDeleted: true
        })
    }

    public async findOnePermissionByName(permissionName: string): Promise<PermissionEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('permission')
            .addSelect(`permission.permissionName`)
            .where({ permissionName })
            .withDeleted()
            .getOne()
    }

    public async createPermission(body: PermissionDTO): Promise<PermissionEntity> {
        return (await this.execRepository).save(body)
    }

    public async updatePermissionById(id: string, infoUpdate: PermissionDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { ...infoUpdate, updatedAt: new Date() })
    }

    public async softDeletePermissionById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).softDelete(id)
    }

    public async restorePermissionById(id: string): Promise<UpdateResult> {
        return (await this.execRepository).restore(id)
    }

    public async destroyPermissionById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete(id)
    }

    public async permissionIsEnabled(id: string): Promise<PermissionEntity | null> {
        return (await this.execRepository).findOne({
            where: { id, deletedAt: undefined },
            select: { id: true }
        })
    }
}