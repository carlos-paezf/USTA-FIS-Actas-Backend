import fs from 'fs'
import path from 'path'
import { red } from "colors"

import { CustomError } from "./custom-error.helper"


/**
 * It takes a string as an argument, checks if a file exists in a specific directory, and if it does,
 * it deletes it
 * @param {string} internalFilename - example: '1575990982409-test.pdf'
 * 
 * @author Carlos Páez
 */
export const removeAttachedFile = async (internalFilename: string) => {
    try {
        const pathFile = path.join(__dirname, '/../../storage', internalFilename)

        if (fs.existsSync(pathFile)) {
            fs.unlink(pathFile, (error) => {
                if (error) throw new CustomError(`UNLINK_FILE`, `The file could not be deleted`)
            })
        } else {
            throw new CustomError(`FILE_NOT_FOUND`, `File with name '${internalFilename}' not found`)
        }

        // eslint-disable-next-line
    } catch (error: any) {
        console.log(red(`Error in removeAttachedFile: `), error)
        throw new CustomError(`DESTROY_ATTACHED_FILE`, error)
    }
}