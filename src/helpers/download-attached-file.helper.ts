import fs from 'fs'
import path from 'path'
import { red } from "colors"

import { CustomError } from "./custom-error.helper"
import { Response } from 'express'


/**
 * It takes a file name and a mimetype, and returns a file stream
 * @param {string} internalFilename - the name of the file that is stored in the storage folder
 * @param {string} mimetype - example: 'image/jpeg'
 * @param {Response} res - Response
 * @returns A ReadStream
 * 
 * @author Carlos Páez
 */
export const downloadAttachedFile = async (internalFilename: string, mimetype: string, res: Response) => {
    try {
        const pathFile = path.join(__dirname, `/../../storage`, internalFilename)

        if (fs.existsSync(pathFile)) {
            const fileDirectory = fs.createReadStream(pathFile)

            // eslint-disable-next-line
            fileDirectory.on('error', (error: any) => {
                if (error.code === 'ENONET') throw new CustomError(`FILE_NOT_FOUND`, error)
                throw new CustomError(`INTERNAL_SERVER_ERROR`, error)
            })

            res.setHeader('Content-Type', mimetype)

            return fileDirectory.pipe(res)
        } else {
            throw new CustomError(`FILE_NOT_FOUND`, `File with name '${internalFilename}' not found`)
        }

        // eslint-disable-next-line
    } catch (error: any) {
        console.log(red(`Error in downloadAttachedFile: `), error)
        throw new CustomError(`DOWNLOAD_IMAGE`, error)
    }
}