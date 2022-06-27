import { UpdateResult, DeleteResult, In } from "typeorm";
import { BaseService } from "../config";
import { UserDTO } from "../dtos";
import { PasswordEncrypter } from "../helpers/password-encrypter.helper";
import { RoleEntity, UserEntity } from "../models";


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

    /**
     * "Finds users from the database, and returns an array of users and the total number of users in
     * the database."
     * 
     * The function takes in 4 parameters:
     * 
     * from: number - The starting point of the query.
     * limit: number - The number of users to return.
     * all: boolean - Whether to return all users or not.
     * order: string - The order of the users to return.
     * The function returns a promise that resolves to an array of users and the total number of users
     * in the database
     * @param {number} from - number - the number of records to skip
     * @param {number} limit - number - the number of records to return
     * @param {boolean} all - boolean - if true, it will return all users, including deleted ones.
     * @param {string} order - string -&gt; ASC or DESC
     * @returns An array of UserEntity and a number.
     */
    public async findUsers(from: number, limit: number, all: boolean, order: string): Promise<[UserEntity[], number]> {
        return (await this.execRepository).findAndCount({
            skip: from,
            take: limit,
            order: { username: (order === 'ASC') ? 'ASC' : 'DESC' },
            withDeleted: all ? true : false,
            relations: { role: true }
        })
    }

    /**
     * Find one user by id
     * @param {string} id - string
     * @returns The user entity
     */
    public async findOneUserById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOne({
            where: { id },
            relations: { role: true }
        })
    }

    /**
     * Find one user by id, including deleted users.
     * @param {string} id - string - the id of the user
     * @returns A promise of a UserEntity or null
     */
    public async findOneUserByIdIncludeDeleted(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOne({
            where: { id },
            withDeleted: true,
            relations: { role: true }
        })
    }

    /**
     * Find a user by email, and return the user's password.
     * @param {string} email - string - the email of the user
     * @returns A UserEntity object with the password property.
     */
    public async findUserByEmail(email: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOne({
            where: { email },
            select: { id: true, password: true }
        })
    }

    /**
     * Find a user by username, and return the user's password.
     * @param {string} username - string
     * @returns A UserEntity object with the password property.
     */
    public async findUserByUsername(username: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOne({
            where: { username },
            select: { id: true, password: true }
        })
    }

    /**
     * Find all users by their ids
     * @param {string[]} arrayIds - string[]
     * @returns An array of UserEntity objects.
     */
    public async findUsersByIds(arrayIds: string[]): Promise<UserEntity[]> {
        return (await this.execRepository).findBy({ id: In(arrayIds) })
    }

    /**
     * It creates a new user, encrypts the password, and saves the user to the database.
     * @param {UserDTO} body - UserDTO
     * @returns The user object with the password hash.
     */
    public async createUser(body: UserDTO): Promise<UserEntity> {
        const newUser = (await this.execRepository).create(body)
        const passwordHash = await PasswordEncrypter.encrypt(newUser.password)
        newUser.password = passwordHash
        return (await this.execRepository).save(newUser)
    }

    /**
     * It updates the user by id.
     * @param {string} id - string - the id of the user to be updated
     * @param {UserDTO} infoUpdate - UserDTO
     * @returns UpdateResult
     */
    public async updateUserById(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { ...infoUpdate, updatedAt: new Date() })
    }

    /**
     * It updates the username of a user by id
     * @param {string} id - string - the id of the user
     * @param {string} username - string
     * @returns UpdateResult
     */
    public async updateUsernameById(id: string, username: string): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { username, updatedAt: new Date() })
    }

    /**
     * Update the email of the user with the given id to the given email.
     * @param {string} id - string - the id of the user
     * @param {string} email - string
     * @returns UpdateResult
     */
    public async updateEmailById(id: string, email: string): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { email, updatedAt: new Date() })
    }

    /**
     * Update the role of the user with the given id to the given email.
     * @param {string} id - string - the id of the user
     * @param {string} email - string
     * @returns UpdateResult
     */
    public async updateUserRoleById(id: string, role: RoleEntity): Promise<UpdateResult> {
        return (await this.execRepository).update(id, { role, updatedAt: new Date() })
    }

    /**
     * Update the password of a user by id
     * @param {string} id - string - the id of the user
     * @param {string} password - string
     * @returns UpdateResult
     */
    public async updatePasswordById(id: string, password: string): Promise<UpdateResult> {
        const passwordHash = await PasswordEncrypter.encrypt(password)
        return (await this.execRepository).update(id, { password: passwordHash, updatedAt: new Date() })
    }

    /**
     * This function will return a promise that will resolve to a DeleteResult object, which will
     * contain the number of rows affected by the delete operation.
     * @param {string} id - string - the id of the user to be deleted
     * @returns The DeleteResult is a class that is used to return the number of affected rows.
     */
    public async softDeleteUserById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).softDelete(id)
    }

    /**
     * Restore a user by id
     * @param {string} id - string - the id of the user to be restored
     * @returns UpdateResult
     */
    public async restoreUserById(id: string): Promise<UpdateResult> {
        return (await this.execRepository).restore(id)
    }

    /**
     * This function deletes a user from the database by their id.
     * @param {string} id - string - The id of the user to delete
     * @returns DeleteResult
     */
    public async destroyUserById(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }

    /**
     * Find a user by id, and if the user is not deleted, return the user's id.
     * @param {string} id - string - the id of the user
     * @returns The user entity with the id and deletedAt fields.
     */
    public async userIsEnabled(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOne({
            where: { id, deletedAt: undefined },
            select: { id: true }
        })
    }
}