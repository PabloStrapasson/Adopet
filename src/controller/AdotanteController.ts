import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { Request, Response } from "express";
import { AdotanteRequestBodyType, AdotanteRequestParamsType, AdotanteResponsetBodyType } from "../types/AdotanteTypes";

export default class AdotanteController {

    constructor(private repository:AdotanteRepository){

    }

    async criaAdotante(req:Request<AdotanteRequestParamsType, {}, AdotanteRequestBodyType>, res:Response<AdotanteResponsetBodyType>) {
        try {
          const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;
          
          const novoAdotante = new AdotanteEntity(
            nome,
            senha,
            celular,
            foto,
            endereco
          );
      
          await this.repository.criaAdotante(novoAdotante);
          return res.status(201).json({ data: { id:novoAdotante.id, nome, celular, endereco } });
        } catch (error) {
          return res.status(500).json({ error: 'Erro ao criar o adotante' });
        }
    }

    async listaAdotantes(req:Request<AdotanteRequestParamsType, {}, AdotanteRequestBodyType>, res:Response<AdotanteResponsetBodyType>) {
      const listaDeAdotantes = await this.repository.listaAdotantes();
      const adotantes = listaDeAdotantes.map((adotante) => {
        return {
          id: adotante.id,
          nome:adotante.nome,
          celular: adotante.celular,
          endereco: adotante.endereco !== null? adotante.endereco: undefined,
        }
      })
      return res.status(200).json({ data: adotantes }); 
    }

    async atualizaAdotante(req:Request<AdotanteRequestParamsType, {}, AdotanteRequestBodyType>, res:Response<AdotanteResponsetBodyType>) {
      const { id } = req.params;
      const { success, message } = await this.repository.atualizaAdotante(
        Number(id),
        req.body as AdotanteEntity
      );
  
      if (!success) {
        return res.status(404).json({ error: message });
      }
  
      return res.sendStatus(204);
    }

    async deletaAdotante(req:Request<AdotanteRequestParamsType, {}, AdotanteRequestBodyType>, res:Response<AdotanteResponsetBodyType>) {
      const { id } = req.params;
  
      const { success, message } = await this.repository.deletaAdotante(
        Number(id)
      );
  
      if (!success) {
        return res.status(404).json({ error: message });
      }
      return res.sendStatus(204);
    }

    async atualizaEnderecoAdotante(req:Request<AdotanteRequestParamsType, {}, EnderecoEntity>, res:Response<AdotanteResponsetBodyType>) {
      const { id } = req.params;
  
      const { success, message } = await this.repository.atualizaEnderecoAdotante( Number(id), req.body );
  
      if (!success) {
        return res.status(404).json({ error: message });
      }
      return res.sendStatus(204);
    }    
}