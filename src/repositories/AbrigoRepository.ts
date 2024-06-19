import { Repository } from "typeorm";
import AbrigoEntity from "../entities/AbrigoEntity";
import InterfaceAbrigoRepository from "./interfaces/InterfaceAbrigoRepository";
import EnderecoEntity from "../entities/EnderecoEntity";
import { BadRequest, NotFound } from "../utils/ErrorHandler";

export default class AbrigoRepository implements InterfaceAbrigoRepository{
    
    private repository:Repository<AbrigoEntity>

    constructor(repository:Repository<AbrigoEntity>){
        this.repository = repository;
    }

    private async verificaEmailAbrigo(email:string) {
      return await this.repository.findOne({ where: { email } });
    }

    private async verificaCelularAbrigo(celular:string) {
      return await this.repository.findOne({ where: { celular } });
    }

    async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
      if((await this.verificaEmailAbrigo(abrigo.email)) || (await this.verificaCelularAbrigo(abrigo.celular))){
        throw new BadRequest("Já existe um abrigo com esse email ou celular cadastrado");
      }  

      await this.repository.save(abrigo);
    }

    async listaAbrigos(): Promise<AbrigoEntity[]> {
        return await this.repository.find();
    }

    async atualizaAbrigo( id: number, newData: AbrigoEntity ): Promise<{ success: boolean; message?: string }> {
      const abrigoToUpdate = await this.repository.findOne({ where: { id } });
    
      if (!abrigoToUpdate) {
        throw new NotFound("Abrigo não encontrado :(")
      }
    
      Object.assign(abrigoToUpdate, newData);
    
      await this.repository.save(abrigoToUpdate);
    
      return { success: true };
    }

    async deletaAbrigo( id: number ): Promise<{ success: boolean; message?: string }> {
      const abrigoToRemove = await this.repository.findOne({ where: { id } });
    
      if (!abrigoToRemove) {
        throw new NotFound("Abrigo não encontrado :(")
      }
    
      await this.repository.remove(abrigoToRemove);
    
      return { success: true };
    }
    
    async atualizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity): Promise<{ success: boolean; message?: string }> {
      const abrigo = await this.repository.findOne({ where: { id: idAbrigo } });

      if(!abrigo) {
        throw new NotFound("Abrigo não encontrado :(")
      }

      const newEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
      abrigo.endereco = newEndereco;
      await this.repository.save(abrigo);
      return { success: true };
    }
}