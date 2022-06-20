import { IncomingWebhook } from '@slack/webhook';


const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK || ``)


export const loggerStream = {
    write: (text: string) => { webHook.send({ text }) }
}