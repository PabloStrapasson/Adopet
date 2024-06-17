import AdotanteEntity from "../entities/AdotanteEntity";

type AdotanteRequestBodyType = Omit<AdotanteEntity, "id" | "pets">;
type AdotanteRequestParamsType = { id?: string };
type AdotanteResponsetBodyType = {
    data?: Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco"> 
         | Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">[],
    error?: unknown
};

export { AdotanteRequestBodyType, AdotanteRequestParamsType, AdotanteResponsetBodyType };