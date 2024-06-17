import PetEntity from "../entities/PetEntity";
import EnumEspecie from "../enum/EnumEspecie";

type PetRequestBodyType = Omit<PetEntity, "id">;
type PetRequestParamsType = { id?: string, pet_id?: string, adotante_id?: string };
type PetResponsetBodyType = {
    data?: Pick<PetEntity, "id" | "nome" | "especie" | "porte"> | Pick<PetEntity, "id" | "nome" | "especie" | "porte">[],
    error?: unknown
};

export { PetRequestBodyType, PetRequestParamsType, PetResponsetBodyType};