import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  old_password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/, {
    message:
      'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial',
  })
  new_password: string;
}
