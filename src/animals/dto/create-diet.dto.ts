import { IsString, MinLength } from 'class-validator';

export class CreateDietDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(10)
  description: string;
}
