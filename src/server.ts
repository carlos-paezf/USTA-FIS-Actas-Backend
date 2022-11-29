import 'reflect-metadata'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import morganBody from 'morgan-body'

import { DataSource } from 'typeorm'
import { blue, green, red } from 'colors'

import { ConfigServer } from './config'
import { accessLoggerStream, loggerStream } from './helpers/logger.helper'
import { AuthRouter } from './auth/router/auth.router'
import {
    AttachedFilesRouter,
    MeetingMinutesRouter,
    ModuleRouter,
    OrganizationRouter,
    PermissionRouter,
    RoleModulePermissionRouter,
    RoleRouter,
    UserRouter
} from './routes'


/**
 * @author Carlos Páez
 */
class ServerBootstrap extends ConfigServer {
    private _app: express.Application = express()
    private _port: number = this.getNumberEnv( `PORT` ) || 3000

    constructor () {
        super()

        this._dbConnect()

        this._middlewares()

        this._app.use( '/auth/', new AuthRouter().router )
        this._app.use( '/api/', this._routers() )

        this._listen()
    }


    /** 
     * A method that connects to the database.
     */
    private _dbConnect = async (): Promise<DataSource | void> => {
        return this.dbConnection
            .then( () => console.log( green.italic( `> Conexión establecida con la base de datos ${ this.getEnvironment( 'DB_DATABASE' ) }` ) ) )
            .catch( ( error ) => console.log( red.italic( `> Error intentando conectar la base de datos ${ this.getEnvironment( 'DB_DATABASE' ) }` ), error ) )
    }


    /**
     * This function is used to set up the middlewares for the express application.
     */
    private _middlewares = (): void => {
        this._app.use( express.json( { limit: "10mb" } ) )
        this._app.use( express.urlencoded( { limit: "10mb", extended: true, parameterLimit: 1000000 } ) )
        this._app.use( morgan( 'common' ) )
        this._app.use( morgan(
            ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :req[header] :res[content-type]',
            {
                stream: accessLoggerStream
            }
        ) )
        // morganBody( this._app, {
        //     noColors: true,
        //     skip: function ( req, res ) { return res.statusCode < 500 },
        //     stream: loggerStream
        // } )
        this._app.use( cors() )
        this._app.use( express.static( `../storage` ) )
    }


    /** 
     * A function that returns an array of express routers.
     */
    private _routers = (): express.Router[] => {
        return [
            new AuthRouter().router,
            new AttachedFilesRouter().router,
            new MeetingMinutesRouter().router,
            new ModuleRouter().router,
            new OrganizationRouter().router,
            new PermissionRouter().router,
            new RoleModulePermissionRouter().router,
            new RoleRouter().router,
            new UserRouter().router,
        ]
    }

    /**
     * Listening to the port.
     */
    private _listen = () => {
        this._app.listen( this._port, () => {
            console.log( blue( `Servidor corriendo en ${ this.getEnvironment( `PUBLIC_URL` ) }:${ this.getNumberEnv( `PORT` ) }` ) )
        } )
    }
}


console.clear()
new ServerBootstrap()