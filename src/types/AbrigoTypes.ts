import AbrigoEntity from "../entities/AbrigoEntity";

type AbrigoRequestBodyType = Omit<AbrigoEntity, "id" | "pets">;
type AbrigoRequestParamsType = { id?: string };
type AbrigoResponsetBodyType = {
    data?: Pick<AbrigoEntity, "id" | "nome" | "email" | "celular" | "endereco"> 
         | Pick<AbrigoEntity, "id" | "nome" | "email" | "celular" | "endereco">[],
};

export { AbrigoRequestBodyType, AbrigoRequestParamsType, AbrigoResponsetBodyType };