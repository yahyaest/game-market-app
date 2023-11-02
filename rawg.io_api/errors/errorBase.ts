export class errorBase extends Error {
    name: string;
    message: string;
    cause: any;
    constructor(name?: any, message?:any, cause?: any) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}