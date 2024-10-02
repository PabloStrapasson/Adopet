import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export class ErrorHandler extends Error {
    readonly statusCode: number;

    constructor(message:string, statusCode:number) {
        super(message);
        this.statusCode = statusCode
    }
}

export class BadRequest extends ErrorHandler {
    constructor(message:string){
        super(message, EnumHttpStatusCode.BAD_REQUEST);
    }
}

export class NotFound extends ErrorHandler {
    constructor(message:string){
        super(message, EnumHttpStatusCode.NOT_FOUND);
    }
}