import { MoreThanOrEqual } from 'typeorm';

import { HistoricalEntity } from '../models';
import { BaseService } from '../config';


export class HistoricalService extends BaseService<HistoricalEntity> {
    constructor() {
        super(HistoricalEntity)
    }

    public async findAllMoves(from: number, limit: number, order: string): Promise<[HistoricalEntity[], number]> {
        return (await this.execRepository).findAndCount({
            skip: from,
            take: limit,
            order: { responseStatusCode: (order === 'ASC') ? 'ASC' : 'DESC' }
        })
    }

    public async findMoveById(id: string): Promise<HistoricalEntity | null> {
        return (await this.execRepository).findOne({
            where: { id },
            relations: { user: true, role: true, module: true, permission: true }
        })
    }

    public async findMovesByUser(userId: string): Promise<[HistoricalEntity[], number]> {
        return (await this.execRepository)
            .createQueryBuilder(`record`)
            .where(`record.user = :userId`, { userId })
            .leftJoinAndSelect(`record.user`, 'user', 'user.id = :userId', { userId })
            .leftJoinAndSelect(`record.role`, 'role')
            .leftJoinAndSelect(`record.module`, 'module')
            .leftJoinAndSelect(`record.permission`, 'permission')
            .getManyAndCount()
    }

    public async findRejectedMoves(from: number, limit: number): Promise<[HistoricalEntity[], number]> {
        return (await this.execRepository).findAndCount({
            skip: from,
            take: limit,
            where: { responseStatusCode: MoreThanOrEqual(400) }
        })
    }

    public async saveMove(body: HistoricalEntity): Promise<HistoricalEntity> {
        return (await this.execRepository).save(body)
    }
}