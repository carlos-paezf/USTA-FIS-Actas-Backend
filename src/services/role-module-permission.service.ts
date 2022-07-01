import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config";
import { RoleModulePermissionDTO } from "../dtos";
import { RoleModulePermissionEntity } from "../models";


export class RoleModulePermissionService extends BaseService<RoleModulePermissionEntity> {
    constructor() {
        super(RoleModulePermissionEntity)
    }

    public async findAllRolesModulesPermissions(from: number, limit: number, order: string): Promise<[RoleModulePermissionEntity[], number]> {
        return (await this.execRepository)
            .createQueryBuilder('roleModulePermission')
            .leftJoinAndSelect('roleModulePermission.role', 'role')
            .leftJoinAndSelect('roleModulePermission.module', 'module')
            .leftJoinAndSelect('roleModulePermission.permission', 'permission')
            .skip(from)
            .take(limit)
            .orderBy('roleModulePermission.createdAt', (order === 'ASC') ? 'ASC' : 'DESC')
            .withDeleted()
            .getManyAndCount()
    }

    public async findOneRoleModulePermissionById(id: string): Promise<RoleModulePermissionEntity | null> {
        return (await this.execRepository).findOne({
            where: { id },
            relations: { role: true, module: true, permission: true }
        })
    }

    public async findOneRoleModulePermissionByIdIncludeDeleted(id: string): Promise<RoleModulePermissionEntity | null> {
        return (await this.execRepository).findOne({
            where: { id },
            relations: { role: true, module: true, permission: true },
            withDeleted: true
        })
    }

    public async createRoleModulePermission(body: RoleModulePermissionDTO): Promise<RoleModulePermissionEntity> {
        return (await this.execRepository).save(body)
    }

    public async updateRoleModulePermissionById(id: string, infoUpdate: RoleModulePermissionDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { ...infoUpdate, updatedAt: new Date() })
    }

    public async softDeleteRoleModulePermissionById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).softDelete(id)
    }

    public async restoreRoleModulePermissionById(id: string): Promise<UpdateResult> {
        return (await this.execRepository).restore(id)
    }

    public async destroyRoleModulePermissionById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete(id)
    }

    public async roleModulePermissionIsEnabled(id: string): Promise<RoleModulePermissionEntity | null> {
        return (await this.execRepository).findOne({
            where: { id, deletedAt: undefined },
            select: { id: true }
        })
    }

    public async validateRoleModulePermissionForJWT(roleId: string, moduleId: string, permissionId: string): Promise<RoleModulePermissionEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('roleModulePermission')
            .where('roleModulePermission.role = :roleId', { roleId })
            .andWhere('roleModulePermission.module = :moduleId', { moduleId })
            .andWhere('roleModulePermission.permission = :permissionId', { permissionId })
            .leftJoin('roleModulePermission.role', 'role', 'role.id = :roleId', { roleId })
            // .leftJoinAndSelect('roleModulePermission.role', 'role', 'role.id = :roleId', { roleId })
            .leftJoin('roleModulePermission.module', 'module', 'module.id = :moduleId', { moduleId })
            // .leftJoinAndSelect('roleModulePermission.module', 'module', 'module.id = :moduleId', { moduleId })
            .leftJoin('roleModulePermission.permission', 'permission', 'permission.id = :permissionId', { permissionId })
            // .leftJoinAndSelect('roleModulePermission.permission', 'permission', 'permission.id = :permissionId', { permissionId })
            .getOne()
    }

    public async findModulesPermissionsByRole(roleId: string): Promise<RoleModulePermissionEntity[]> {
        return (await this.execRepository)
            .createQueryBuilder(`roleModulePermission`)
            .where('roleModulePermission.role = :roleId', { roleId })
            .leftJoin('roleModulePermission.role', 'role', 'role.id = :roleId', { roleId })
            .leftJoinAndSelect('roleModulePermission.module', 'module')
            .leftJoinAndSelect('roleModulePermission.permission', 'permission')
            .getMany()
    }
}