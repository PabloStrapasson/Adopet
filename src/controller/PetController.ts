import { Request, Response } from "express";
import type PetType from "../types/PetType";
import EnumEspecie from "../enum/EnumEspecie";
import EnumPorte from "../enum/EnumPorte";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {

    constructor(private repository:PetRepository){

    }

    async criaPet(req:Request, res:Response) {
        const { nome, especie, porte, adotado, dataDeNascimento } = <PetEntity>req.body;
        if(!Object.values(EnumEspecie).includes(especie)){
            return res.status(400).json({ erro: "especie inválida" });
        }
        if(!(porte && porte in EnumPorte)){
          return res.status(400).json({ erro: "porte inválido" });
      }
        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte );
        novoPet.id = geraId();
        novoPet.nome = nome;
        novoPet.especie = especie;
        novoPet.porte = porte
        novoPet.adotado = adotado;
        novoPet.dataDeNascimento = dataDeNascimento;
        await this.repository.criaPet(novoPet);
        return res.status(201).json(novoPet);
    }

    async listaPets(req:Request, res:Response) {
        const listaPets = await this.repository.listaPets();
        return res.status(200).json(listaPets);
    }

    async atualizaPets(req:Request, res:Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaPet(
            Number(id),
            req.body as PetEntity
        );

        if (!success) {
            return res.status(404).json({ message });
        }
        return res.sendStatus(204);
    }

    async deletaPet(req:Request, res:Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.deletaPet(Number(id));

        if (!success) {
          return res.status(404).json({ message });
        }
        return res.sendStatus(204);
    }

    async adotaPet(req: Request, res: Response) {
      const { pet_id, id_adotante } = req.params;
      const { success, message } = await this.repository.adotaPet(
        Number(pet_id),
        Number(id_adotante)
      );
      if (!success) {
        return res.status(404).json({ message });
      }
      return res.sendStatus(204);
    }

    async buscaPetGenerico(req:Request, res:Response) {
      const { campo, valor } = req.query;
      const listaPets = await this.repository.buscaPetGenerico(campo as keyof PetEntity, valor as string);
      return res.status(200).json(listaPets);
  }

}