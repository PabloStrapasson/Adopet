import AbrigoEntity from "../entities/AbrigoEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { Request, Response } from "express";
import { AbrigoRequestBodyType, AbrigoRequestParamsType, AbrigoResponsetBodyType } from "../types/AbrigoTypes";
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export default class AbrigoController {

    constructor(private repository:AbrigoRepository){ }

    async criaAbrigo(req:Request<AbrigoRequestParamsType, {}, AbrigoRequestBodyType>, res:Response<AbrigoResponsetBodyType>) {
      const { nome, celular, endereco, email, senha } = <AbrigoEntity>req.body;
          
      const novoAbrigo = new AbrigoEntity(
        nome,
        senha,
        celular,
        email,
        endereco
      );
  
      await this.repository.criaAbrigo(novoAbrigo);
      return res.status(EnumHttpStatusCode.CREATED).json({ data: { id:novoAbrigo.id, nome, celular, email, endereco } });
    }

    async listaAbrigos(req:Request<AbrigoRequestParamsType, {}, AbrigoRequestBodyType>, res:Response<AbrigoResponsetBodyType>) {
      const listaDeAbrigos = await this.repository.listaAbrigos();
      const abrigos = listaDeAbrigos.map((abrigo) => {
        return {
          id: abrigo.id,
          nome:abrigo.nome,
          celular: abrigo.celular,
          email: abrigo.email,
          endereco: abrigo.endereco !== null? abrigo.endereco: undefined,
        }
      })
      return res.status(EnumHttpStatusCode.OK).json({ data: abrigos }); 
    }

    async atualizaAbrigo(req:Request<AbrigoRequestParamsType, {}, AbrigoRequestBodyType>, res:Response<AbrigoResponsetBodyType>) {
      const { id } = req.params;
      const { success, message } = await this.repository.atualizaAbrigo( Number(id), req.body as AbrigoEntity );
  
      return res.sendStatus(EnumHttpStatusCode.NO_CONTENT);
    }

    async deletaAbrigo(req:Request<AbrigoRequestParamsType, {}, AbrigoRequestBodyType>, res:Response<AbrigoResponsetBodyType>) {
      const { id } = req.params;
      const { success, message } = await this.repository.deletaAbrigo( Number(id) );

      return res.sendStatus(EnumHttpStatusCode.NO_CONTENT);
    }

    async atualizaEnderecoAbrigo(req:Request<AbrigoRequestParamsType, {}, EnderecoEntity>, res:Response<AbrigoResponsetBodyType>) {
      const { id } = req.params;
  
      const { success, message } = await this.repository.atualizaEnderecoAbrigo( Number(id), req.body );
  
      return res.sendStatus(EnumHttpStatusCode.OK);
    }    
}