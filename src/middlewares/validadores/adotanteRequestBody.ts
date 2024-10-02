import { Request, Response, NextFunction } from "express";
import { AdotanteRequestBodyType } from "../../types/AdotanteTypes";
import * as yup from "yup";
import { pt } from "yup-locale-pt";

yup.setLocale(pt);

const esquemaBodyAdotante: yup.ObjectSchema<Omit<AdotanteRequestBodyType, "endereco">> = yup.object({
    nome: yup.string().defined().required(),
    senha: yup.string()
              .defined()
              .required()
              .min(6)
              .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm, "senha inválida"),
    celular: yup.string()
                .defined()
                .required()
                .matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "número de telefone inválido"),
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