import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { AdotanteRequestBodyType, AdotanteRequestParamsType, AdotanteResponsetBodyType } from "../../types/AdotanteTypes";

const esquemaBodyAdotante: yup.ObjectSchema<Omit<AdotanteRequestBodyType, "endereco">> = yup.object({
    nome: yup.string().defined().required(),
    senha: yup.string().defined().required().min(6),
    celular: yup.string().defined().required(),
    foto: yup.string().optional()
  })

const validadorBodyAdotante = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await esquemaBodyAdotante.validate(req.body, { abortEarly: false });
        return next();
    } catch(error){
        const yupError = error as yup.ValidationError;
        const validationErrors:Record<string, string> = {}
        yupError.inner.forEach((error) => {
        if(!error.path) return;
            validationErrors[error.path] = error.message
        })
        return res.status(400).json({ error: validationErrors });
    }
}

export { validadorBodyAdotante };