import { Request, Response } from "express";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import { PetRequestBodyType, PetRequestParamsType, PetResponsetBodyType } from "../types/PetTypes";

export default class PetController {

    constructor(private repository:PetRepository){

    }

    async criaPet(req:Request<PetRequestParamsType, {}, PetRequestBodyType>, res:Response<PetResponsetBodyType>) {
        const { nome, especie, porte, adotado, dataDeNascimento } = <PetEntity>req.body;
      
        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte );
        novoPet.nome = nome;
        novoPet.especie = especie;
        novoPet.porte = porte
        novoPet.adotado = adotado;
        novoPet.dataDeNascimento = dataDeNascimento;
        await this.repository.criaPet(novoPet);
        return res.status(201).json({ data: { id:novoPet.id, nome, especie, porte } });
    }

    async listaPets(req:Request<PetRequestParamsType, {}, PetRequestBodyType>, res:Response<PetResponsetBodyType>) {
        const listaPets = await this.repository.listaPets();
        const pets = listaPets.map((pet) => {
          return {
            id: pet.id,
            nome:pet.nome,
            especie: pet.especie,
            porte: pet.porte !== null? pet.porte: undefined,
          }
        })
        return res.status(200).json({ data: pets });
    }

    async atualizaPets(req:Request<PetRequestParamsType, {}, PetRequestBodyType>, res:Response<PetResponsetBodyType>) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaPet(
            Number(id),
            req.body as PetEntity
        );

        return res.sendStatus(204);
    }

    async deletaPet(req:Request<PetRequestParamsType, {}, PetRequestBodyType>, res:Response<PetResponsetBodyType>) {
        const { id } = req.params;

        const { success, message } = await this.repository.deletaPet(Number(id));

        return res.sendStatus(204);
    }

    async adotaPet(req:Request<PetRequestParamsType, {}, PetRequestBodyType>, res:Response<PetResponsetBodyType>) {
      const { pet_id, adotante_id } = req.params;
      const { success, message } = await this.repository.adotaPet(
        Number(pet_id),
        Number(adotante_id)
      );
      
      return res.sendStatus(204);
    }

    async buscaPetGenerico(req:Request, res:Response) {
      const { campo, valor } = req.query;
      const listaPets = await this.repository.buscaPetGenerico(campo as keyof PetEntity, valor as string);
      return res.status(200).json(listaPets);
  }

}