import { IsNotEmpty, IsUUID } from "class-validator";

export default class DesvincularCulturaDto {
  @IsNotEmpty({ message: "O campo idCultura é obrigatório" })
  @IsUUID("4", { message: "O campo idCultura deve ser um UUID" })
  idCultura: string;
}
