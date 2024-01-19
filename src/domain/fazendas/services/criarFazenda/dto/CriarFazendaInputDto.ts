import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export default class CriarFazendaInputDto {
  @IsString({ message: 'O campo "nomeFazenda" deve ser uma string' })
  @IsNotEmpty({ message: 'O campo "nomeFazenda" é obrigatório' })
  nomeFazenda: string;

  @IsString({ message: 'O campo "estado" deve ser uma string' })
  @IsNotEmpty({ message: 'O campo "estado" é obrigatório' })
  estado: string;

  @IsString({ message: 'O campo "cidade" deve ser uma string' })
  @IsNotEmpty({ message: 'O campo "cidade" é obrigatório' })
  cidade: string;

  @IsNumber(
    {},
    { message: 'O campo "totalDeHectares" deve ser um número inteiro' }
  )
  @IsPositive({
    message: 'O valor do campo "totalDeHectares" deve ser positivo',
  })
  @IsNotEmpty({ message: 'O campo "totalDeHectares" é obrigatório' })
  totalDeHectares: number;

  @IsNumber(
    {},
    { message: 'O campo "hectaresAgricultaveis" deve ser um número inteiro' }
  )
  @IsPositive({
    message: 'O valor do campo "hectaresAgricultaveis" deve ser positivo',
  })
  @IsNotEmpty({ message: 'O campo "hectaresAgricultaveis" é obrigatório' })
  hectaresAgricultaveis: number;

  @IsNumber(
    {},
    { message: 'O campo "hectaresVegetacao" deve ser um número inteiro' }
  )
  @IsPositive({
    message: 'O valor do campo "hectaresVegetacao" deve ser positivo',
  })
  @IsNotEmpty({ message: 'O campo "hectaresVegetacao" é obrigatório' })
  hectaresVegetacao: number;
}
