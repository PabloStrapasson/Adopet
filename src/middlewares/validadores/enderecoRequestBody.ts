import { Request, Response, NextFunction } from "express";
import EnderecoEntity from "../../entities/EnderecoEntity";
import * as yup from "yup";
import { pt } from "yup-locale-pt";

yup.setLocale(pt);

const esquemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> = yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required(),
  })

const validadorBodyEndreco = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await esquemaBodyEndereco.validate(req.body, { abortEarly: false });
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

export { validadorBodyEndreco };