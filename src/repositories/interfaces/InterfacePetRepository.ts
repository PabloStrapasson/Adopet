import EnumPorte from '../../enum/EnumPorte';
import PetEntity from './../../entities/PetEntity';

export default interface InterfacePetRepository { 
    criaPet(pet:PetEntity): void;
    listaPets(): PetEntity[] | Promise<PetEntity[]>;
    atualizaPet(id:number, pet:PetEntity): void;
    deletaPet(id:number): void;
    adotaPet(idPet:number, idAdotante:number): void;
    buscaPetGenerico<Tipo extends keyof PetEntity>(campo:Tipo, valor:PetEntity[Tipo]): Promise<PetEntity[]> | PetEntity[];
}