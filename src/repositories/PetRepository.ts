import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository"
import AdotanteEntity from './../entities/AdotanteEntity';
import { NotFound } from "../utils/ErrorHandler";

export default class PetRepository implements InterfacePetRepository {

    private petRepository:Repository<PetEntity>
    private adotanteRepository:Repository<AdotanteEntity>

    constructor(petRepository:Repository<PetEntity>, adotanteRepository:Repository<AdotanteEntity>){
        this.petRepository = petRepository;
        this.adotanteRepository = adotanteRepository;
    }

    criaPet(pet: PetEntity): void {
        this.petRepository.save(pet);
    }
    listaPets(): Promise<PetEntity[]> {
        return this.petRepository.find();
    }
    async atualizaPet(id: number, newPet: PetEntity): Promise<{ success: boolean; message?: string }> {
        
        const petToUpdate = await this.petRepository.findOne({ where: { id } });
        if (!petToUpdate) {
            throw new NotFound("Pet não encontrado :(");
        }
        Object.assign(petToUpdate, newPet);
        await this.petRepository.save(petToUpdate);
        return { success: true };
    }
    async deletaPet(id: number): Promise<{ success: boolean; message?: string }> {
        const petToRemove = await this.petRepository.findOne({ where: { id } });
        if (!petToRemove) {
            throw new NotFound("Pet não encontrado :(");
        }
        await this.petRepository.remove(petToRemove);
        return { success: true };
    }

    async adotaPet(idPet:number, idAdotante:number): Promise<{ success: boolean; message?: string }> {
        const pet = await this.petRepository.findOne({ where: { id: idPet } });
        if (!pet) {
            throw new NotFound("Pet não encontrado :(");
        }

        const adotante = await this.adotanteRepository.findOne({ where: { id: idAdotante } });
        if (!adotante) {
            throw new NotFound("Adotante não encontrado :(");
        }

        pet.adotante = adotante;
        pet.adotado = true;
        await this.petRepository.save(pet);
        return { success: true };
    }

    async buscaPetGenerico<Tipo extends keyof PetEntity>(campo:Tipo, valor:PetEntity[Tipo]): Promise<PetEntity[]> {
        const pets = await this.petRepository.find({ where: { [campo]: valor } });
        return pets;
    }
}