import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { DataSource } from 'typeorm'
import { blue, green, red } from 'colors'

import { IncomingWebhook } from '@slack/webhook'
import { ConfigServer } from './config'


/**
 * @author Carlos Páez
 */
class ServerBootstrap extends ConfigServer {
    private _app: express.Application = express()
    private _port: number = this.getNumberEnv(`PORT`) || 3000
    private _webHook = new IncomingWebhook(this.getEnvironment(`SLACK_WEBHOOK`) || ``)

    constructor() {
        super()

        this._app.use(express.json())
        this._app.use(express.urlencoded({ extended: true }))
        this._app.use(morgan('common', {
            skip: function (req, res) { return res.statusCode < 400 },
            stream: {
                write: text => { this._webHook.send({ text }) }
            }
        }))
        this._app.use(cors())

        this._passportUse()
        this._dbConnect()

        // this._app.use('/api/', this._routers())
        this._app.use('/api/', (req, res) => { res.send('hola') })

        this._listen()
    }


    /** 
     * A function that returns an array of express routers.
     */
    private _routers = (): express.Router[] => {
        return []
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


new ServerBootstrap()