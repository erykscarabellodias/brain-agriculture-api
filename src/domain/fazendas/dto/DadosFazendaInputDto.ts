import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
} from "class-validator";

export default class DadosFazendaInputDto {
  @IsString({ message: 'O campo "nomeFazenda" deve ser uma string' })
  @IsNotEmpty({ message: 'O campo "nomeFazenda" é obrigatório' })
  nomeFazenda: string;

  @IsString({ message: 'O campo "cep" deve ser uma string' })
  @IsNotEmpty({ message: 'O campo "cep" é obrigatório' })
  @Matches(/^[0-9]{5}-?[0-9]{3}$/, {
    message: 'Envie o campo "cep" no formato 01153-000',
  })
  cep: string;

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
