import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsString()
  @IsIn(['M', 'F'])
  gender: 'M' | 'F';

  @IsDateString()
  birth: Date;

  @IsDateString()
  arrival: Date;

  @IsString()
  @IsIn(['healthy', 'sick', 'injured'])
  health_condition: 'healthy' | 'sick' | 'injured';

  @IsString()
  @IsIn(['exhibit', 'quarantine'])
  exhibit_status: 'exhibit' | 'quarantine';
}
