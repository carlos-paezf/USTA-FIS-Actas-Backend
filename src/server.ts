import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { DataSource } from 'typeorm'
import { blue, green, red } from 'colors'

import { ConfigServer } from './config'
import { ModuleRouter, PermissionRouter, RoleRouter, UserRouter } from './routes'
// import { loggerStream } from './helpers/logger.helper'


/**
 * @author Carlos Páez
 */
class ServerBootstrap extends ConfigServer {
    private _app: express.Application = express()
    private _port: number = this.getNumberEnv(`PORT`) || 3000

    constructor() {
        super()

        this._app.use(express.json())
        this._app.use(express.urlencoded({ extended: true }))
        this._app.use(cors())
        /* this._app.use(morgan(
            ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :req[header] :res[content-type]',
            {
                skip: function (req, res) { return res.statusCode < 400 },
                stream: loggerStream
            }
        )) */
        this._app.use(morgan('common'))

        this._passportUse()
        this._dbConnect()

        this._app.use('/api/', this._routers())

        this._listen()
    }


    /** 
     * A function that returns an array of express routers.
     */
    private _routers = (): express.Router[] => {
        return [
            new UserRouter().router,
            new RoleRouter().router,
            new ModuleRouter().router,
            new PermissionRouter().router
        ]
    }

    private _passportUse = () => {
        return []
    }

    /** 
     * A method that connects to the database.
     */
    private _dbConnect = async (): Promise<DataSource | void> => {
        return this.dbConnection
            .then(() => console.log(green.italic(`> Conexión establecida con la base de datos ${this.getEnvironment('DB_DATABASE')}`)))
            .catch((error) => console.log(red.italic(`> Error intentando conectar la base de datos ${this.getEnvironment('DB_DATABASE')}`), error))
    }

    /**
     * Listening to the port.
     */
    private _listen = () => {
        this._app.listen(this._port, () => {
            console.log(blue(`Servidor corriendo en ${this.getEnvironment(`PUBLIC_URL`)}:${this.getNumberEnv(`PORT`)}`))
        })
    }
}


console.clear()
new ServerBootstrap()