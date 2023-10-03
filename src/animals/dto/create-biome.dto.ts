import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBiomeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  image_url: string;
}
