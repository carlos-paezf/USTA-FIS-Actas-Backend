import 'reflect-metadata'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
// import morganBody from 'morgan-body'

import { DataSource } from 'typeorm'
import { blue, green, red } from 'colors'

import { ConfigServer } from './config'
// import { accessLoggerStream, loggerStream } from './helpers/logger.helper'
import { AuthRouter } from './auth/router/auth.router'
import {
    MeetingMinutesRouter, ModuleRouter, PermissionRouter, RoleModulePermissionRouter, RoleRouter, UserRouter
} from './routes'


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
        this._app.use(morgan('common'))
        /* this._app.use(morgan(
            ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :req[header] :res[content-type]',
            {
                stream: accessLoggerStream
            }
        )) */
        /* morganBody(this._app, {
            noColors: true,
            skip: function (req, res) { return res.statusCode < 500 },
            stream: loggerStream
        }) */
        this._app.use(cors())

        this._dbConnect()

        this._app.use('/auth/', new AuthRouter().router)
        this._app.use('/api/v1/', this._routers())

        this._listen()
    }


    /** 
     * A function that returns an array of express routers.
     */
    private _routers = (): express.Router[] => {
        return [
            new AuthRouter().router,
            new UserRouter().router,
            new RoleRouter().router,
            new ModuleRouter().router,
            new PermissionRouter().router,
            new RoleModulePermissionRouter().router,
            new MeetingMinutesRouter().router
        ]
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