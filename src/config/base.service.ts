import { EntityTarget, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";


/**
 * A base class that is used to create a repository for the entity passed to it.
 * 
 * @author Carlos Páez
 */
export abstract class BaseService<T extends BaseEntity> extends ConfigServer {
    public execRepository: Promise<Repository<T>>

    constructor(private _getEntity: EntityTarget<T>) {
        super()
        this.execRepository = this.initRepository(this._getEntity)
    }

    /**
     * This function returns a repository of the entity passed to it.
     * @param entity - EntityTarget<T>
     * @returns A promise that resolves to a Repository<T>
     */
    public initRepository = async (entity: EntityTarget<T>): Promise<Repository<T>> => {
        const getConnection = await this.dbConnection
        return getConnection.getRepository(entity)
    }
}