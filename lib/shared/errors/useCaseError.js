import ExtendableError from './extendableError'
export default class UseCaseError extends ExtendableError{
    constructor(message, statusCode = 400) {
        super(message)
        this.statusCode = statusCode
    }
}