/**
 * It's a custom error class that extends the built-in Error class, 
 * and it has a code property that can be used to identify the error. 
 * 
 * @author Carlos Páez
 */
export class CustomError extends Error {
    code: string;
    date: Date;
    constructor(code = 'CusErr', message = 'Custom Error', name = 'Custom Error', ...params: any) {
        super(...params)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }

        this.name = name
        this.message = message
        this.code = code
        this.date = new Date()
    }
}