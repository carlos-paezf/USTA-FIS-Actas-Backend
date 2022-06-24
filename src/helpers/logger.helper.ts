import fs from 'fs'
import path from 'path';
import { IncomingWebhook } from '@slack/webhook';


const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK || ``)


export const accessLoggerStream = fs.createWriteStream(path.join(__dirname, '/../../access.log'), { flags: 'a' })

export const loggerStream = {
    write: (text: string) => {
        webHook.send({ text })
        return true
    }
}