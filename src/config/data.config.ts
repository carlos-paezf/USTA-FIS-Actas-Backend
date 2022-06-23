import dotenv from 'dotenv'
import path from 'path'
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';


dotenv.config({
    path: process.env.NODE_ENV !== undefined ? `${process.env.NODE_ENV.trim()}.env` : `.env`
})


/**
 * A configuration object for the database. 
 */
const Config: DataSourceOptions = {
    type: `mysql`,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: [path.join(__dirname, `/../models/*.entity{.ts,.js}`)],
    migrations: [path.join(__dirname, `/../migrations/*{.ts,.js}`)],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy()
}


/**
 * Creating a new instance of the DataSource class and passing in the Config object.
 */
export const AppDataSource: DataSource = new DataSource(Config)