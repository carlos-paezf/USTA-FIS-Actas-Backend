import path from "path"
import multer from "multer";
import { v4 as uuidv4 } from "uuid"
import { CustomError } from "./custom-error.helper";


/*eslint-disable */
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const uploadPath = path.join(__dirname, '../../storage')
        callback(null, uploadPath)
    },
    filename: (req, file, callback) => {
        const allowedExtensions = ['png', 'jpg', 'jpeg', 'mp3', 'mp4', 'docx', 'pptx', 'xml', 'pdf', 'txt']
        const extension = file.originalname.split('.').pop()
        if (!allowedExtensions.includes(extension!)) {
            return callback(
                new CustomError(
                    `EXTENSION_ERROR`,
                    `The extension '${extension}' of the '${file.originalname}' is not allowed. Allowed extensions: '${allowedExtensions.join(', ')}'`,
                    `ForbiddenExtension`
                ),
                ``
            )
        }
        const internalName = `${uuidv4()}.${extension}`
        callback(null, internalName)
    }
})


export const uploadFiles = multer({ storage, limits: { fileSize: 10485760 } }).array(`attached_files`, 10)
/*eslint-enable */
