import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from '../utils/ErrorHandler';
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export const errorMiddleware = (erro:ErrorHandler, req:Request, res:Response, next:NextFunction) => {
    const statusCode = erro.statusCode ?? EnumHttpStatusCode.INTERNAL_SERVER_ERROR;
    const memssage = erro.statusCode ? erro.message : "Erro interno do servidor";

    res.status(statusCode).json({ memssage });
    return next();
}