import { UpdateResult, DeleteResult } from "typeorm";
import { BaseService } from "../config";
import { RoleType, UserDTO } from "../dtos";
import { PasswordEncrypter } from "../helpers/password-encrypter.helper";
import { UserEntity } from "../models";


/**
 * This class is a service class that extends the `BaseService` class 
 * and uses the `UserEntity` class to perform CRUD operations on the 
 * `User` table in the database 
 * 
 * @author Carlos Páez
 */
export class UserService extends BaseService<UserEntity> {
    constructor() {
        super(UserEntity)
    }

    public async findAllUsers(): Promise<UserEntity[]> {
        return (await this.execRepository).find()
    }

    public async findOneUserById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }

    public async createUser(body: UserDTO): Promise<UserEntity> {
        const newUser = (await this.execRepository).create(body)
        const passwordHash = await PasswordEncrypter.encrypt(newUser.password)
        newUser.password = passwordHash
        return (await this.execRepository).save(newUser)
    }

    public async updateUserById(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }

    public async destroyUserById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }

    public async softDeleteUserById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).update(id, { status: false })
    }

    public async findUserByEmail(email: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder(`user`)
            .addSelect(`user.password`)
            .where({ email })
            .getOne()
    }

    public async findUserByUsername(username: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder(`user`)
            .addSelect(`user.password`)
            .where({ username })
            .getOne()
    }

    public async findUserWithRole(id: string, role: RoleType): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder(`user`)
            .where({ id })
            .andWhere({ role })
            .getOne()
    }
}