import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entities/EnderecoEntity";
import { BadRequest, NotFound } from "../utils/ErrorHandler";

export default class AdotanteRepository implements InterfaceAdotanteRepository{
    
    private repository:Repository<AdotanteEntity>

    constructor(repository:Repository<AdotanteEntity>){
        this.repository = repository;
    }

    private async verificaCelualrAdotante(celular:string) {
      return await this.repository.findOne({ where: { celular } });
    }

    async criaAdotante(adotante: AdotanteEntity): Promise<void> {
      if(await this.verificaCelualrAdotante(adotante.celular)){
        throw new BadRequest("número de celular já cadastrado");
      }  

      await this.repository.save(adotante);
    }

    async listaAdotantes(): Promise<AdotanteEntity[]> {
        return await this.repository.find();
    }

    async atualizaAdotante( id: number, newData: AdotanteEntity ): Promise<{ success: boolean; message?: string }> {
      const adotanteToUpdate = await this.repository.findOne({ where: { id } });
    
      if (!adotanteToUpdate) {
        throw new NotFound("Adotante não encontrado :(")
      }
    
      Object.assign(adotanteToUpdate, newData);
    
      await this.repository.save(adotanteToUpdate);
    
      return { success: true };
    }

    async deletaAdotante( id: number ): Promise<{ success: boolean; message?: string }> {
      const adotanteToRemove = await this.repository.findOne({ where: { id } });
    
      if (!adotanteToRemove) {
        throw new NotFound("Adotante não encontrado :(")
      }
    
      await this.repository.remove(adotanteToRemove);
    
      return { success: true };
    }
    
    async atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): Promise<{ success: boolean; message?: string }> {
      const adotante = await this.repository.findOne({ where: { id: idAdotante } });

      if(!adotante) {
        throw new NotFound("Adotante não encontrado :(")
      }

      const newEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
      adotante.endereco = newEndereco;
      await this.repository.save(adotante);
      return { success: true };
    }
}