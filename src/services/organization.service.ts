import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config";
import { OrganizationDTO } from "../dtos";
import { OrganizationEntity } from "../models";


export class OrganizationService extends BaseService<OrganizationEntity> {
    constructor() {
        super(OrganizationEntity)
    }

    public async findAllOrganizations(from: number, limit: number, order: string, all: boolean): Promise<[OrganizationEntity[], number]> {
        return (await this.execRepository).findAndCount({
            skip: from,
            take: limit,
            withDeleted: (all) ? true : false,
            order: { organizationName: (order === 'ASC') ? 'ASC' : 'DESC' }
        })
    }

    public async findAllDeletedOrganizations(from: number, limit: number, order: string): Promise<[OrganizationEntity[], number]> {
        return (await this.execRepository)
            .createQueryBuilder(`organization`)
            .skip(from).take(limit)
            .orderBy(`organization.organizationName`, (order === 'ASC') ? 'ASC' : 'DESC')
            .where(`organization.deletedAt IS NOT NULL`)
            .withDeleted()
            .getManyAndCount()
    }

    public async searchOrganizationsByName(organizationName: string): Promise<[OrganizationEntity[], number]> {
        return (await this.execRepository)
            .createQueryBuilder(`organization`)
            .where(`MATCH(organization.organizationName) AGAINST ('${organizationName}' IN BOOLEAN MODE)`)
            .withDeleted()
            .getManyAndCount()
    }

    public async findOneOrganizationById(id: string, deleted: boolean): Promise<OrganizationEntity | null> {
        return (await this.execRepository).findOne({
            where: { id },
            withDeleted: (deleted) ? true : false
        })
    }

    public async findOneOrganizationByName(organizationName: string): Promise<OrganizationEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder(`organization`)
            .where(`MATCH(organization.organizationName) AGAINST ('${organizationName}' IN BOOLEAN MODE)`)
            .withDeleted()
            .getOne()
    }

    public async saveOrganization(body: OrganizationDTO): Promise<OrganizationEntity> {
        return (await this.execRepository).save(body)
    }

    public async updateOrganizationById(id: string, infoUpdate: OrganizationDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { ...infoUpdate, updatedAt: new Date() })
    }

    public async softDeleteOrganizationById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).softDelete(id)
    }

    public async restoreOrganizationById(id: string): Promise<UpdateResult> {
        return (await this.execRepository).restore(id)
    }

    public async destroyOrganizationById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete(id)
    }

    public async organizationIsEnabled(id: string): Promise<OrganizationEntity | null> {
        return (await this.execRepository).findOne({
            where: { id, deletedAt: undefined },
            select: { id: true }
        })
    }
}