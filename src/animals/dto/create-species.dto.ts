import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateSpeciesDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  scientific_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(15)
  description: string;

  @IsUUID()
  biome_id: string;
}
