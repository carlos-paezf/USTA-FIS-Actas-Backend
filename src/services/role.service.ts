import { UpdateResult, DeleteResult } from 'typeorm';
import { BaseService } from "../config";
import { RoleDTO } from "../dtos";
import { RoleEntity } from "../models";


export class RoleService extends BaseService<RoleEntity> {
    constructor() {
        super(RoleEntity)
    }

    public async findAllRoles(from: number, limit: number, all: boolean, order: string): Promise<[RoleEntity[], number]> {
        return (await this.execRepository).findAndCount({
            skip: from,
            take: limit,
            order: { roleName: (order === 'ASC') ? 'ASC' : 'DESC' },
            withDeleted: all ? true : false
        })
    }

    public async findOneRoleById(id: string): Promise<RoleEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }

    public async findOneRoleByIdIncludeDeleted(id: string): Promise<RoleEntity | null> {
        return (await this.execRepository).findOne({
            where: { id },
            withDeleted: true
        })
    }

    public async findOneRoleByName(roleName: string): Promise<RoleEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('role')
            .addSelect(`role.roleName`)
            .where({ roleName })
            .withDeleted()
            .getOne()
    }

    public async createRole(body: RoleDTO): Promise<RoleEntity> {
        return (await this.execRepository).save(body)
    }

    public async updateRoleById(id: string, infoUpdate: RoleDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { ...infoUpdate, updatedAt: new Date() })
    }

    public async softDeleteRoleById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).softDelete(id)
    }

    public async restoreRoleById(id: string): Promise<UpdateResult> {
        return (await this.execRepository).restore(id)
    }

    public async destroyRoleById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete(id)
    }

    public async roleIsEnabled(id: string): Promise<RoleEntity | null> {
        return (await this.execRepository).findOne({
            where: { id, deletedAt: undefined },
            select: { id: true }
        })
    }
}