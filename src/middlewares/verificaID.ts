import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../utils/ErrorHandler";

export const verificaIdMiddleware = ( req:Request, res:Response, next:NextFunction) => {
    const params = { ...req.params };
    for (const param in params) {
        if(!Number.isInteger(Number(params[param]))) {
            throw new BadRequest(`O parametro ${param} deve ser um número inteiro`);
        }
        next();
    }
}