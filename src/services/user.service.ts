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

    public async findUsers(from: number, limit: number, all: boolean, disabled: boolean, order: string): Promise<[UserEntity[], number]> {
        return (await this.execRepository).findAndCount({
            skip: from,
            take: limit,
            order: { username: (order === 'ASC') ? 'ASC' : 'DESC' },
            where: disabled ? { status: false } : {},
            withDeleted: all ? true : false
        })
    }

    public async findOneUserById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }

    public async findUserByEmail(email: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder(`user`)
            .addSelect(`user.password`)
            .where({ email })
            .withDeleted()
            .getOne()
    }

    public async findUserByUsername(username: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder(`user`)
            .addSelect(`user.password`)
            .where({ username })
            .withDeleted()
            .getOne()
    }

    public async findUserWithRole(id: string, role: RoleType): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder(`user`)
            .where({ id })
            .andWhere({ role })
            .getOne()
    }

    public async createUser(body: UserDTO): Promise<UserEntity> {
        const newUser = (await this.execRepository).create(body)
        const passwordHash = await PasswordEncrypter.encrypt(newUser.password)
        newUser.password = passwordHash
        return (await this.execRepository).save(newUser)
    }

    public async updateUserById(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { ...infoUpdate, updatedAt: new Date() })
    }

    public async updateUsernameById(id: string, username: string): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { username, updatedAt: new Date() })
    }

    public async updateEmailById(id: string, email: string): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { email, updatedAt: new Date() })
    }

    public async updatePasswordById(id: string, password: string): Promise<UpdateResult> {
        const passwordHash = await PasswordEncrypter.encrypt(password)
        return (await this.execRepository).update(id, { password: passwordHash, updatedAt: new Date() })
    }

    public async enableUserById(id: string): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { status: true, updatedAt: new Date() })
    }

    public async disableUserById(id: string): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { status: false, updatedAt: new Date() })
    }

    public async softDeleteUserById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).softDelete(id)
    }

    public async destroyUserById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
}