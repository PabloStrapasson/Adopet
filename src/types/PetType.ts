import EnumEspecie from "../enum/EnumEspecie";

type PetType = {
    id: number;
    nome: string;
    especie: EnumEspecie;
    adotado: boolean;
    dataDeNascimento: Date;
}

export default PetType;