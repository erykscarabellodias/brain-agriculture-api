import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class DadosProdutorInputDto {
  @IsString({ message: 'O campo "nomeProdutor" deve ser uma string' })
  @IsNotEmpty({ message: 'O campo "nomeProdutor" é obrigatório' })
  nomeProdutor: string;

  @IsString()
  @IsOptional()
  cpf: string;

  @IsString()
  @IsOptional()
  cnpj: string;
}
