import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CriarLivroDto {
  @IsNotEmpty({ message: '[codigo] não pode ser vazio' })
  @IsString({ message: '[codigo] deve ser um string' })
  codigo: string;

  @IsNotEmpty({ message: '[titulo] não pode ser vazio' })
  @IsString({ message: '[titulo] deve ser um string' })
  titulo: string;

  @IsArray({ message: '[autor] não pode ser vazio' })
  @IsString({ each: true, message: '[autor] deve ser uma lista de string' })
  autor: string[];
}
