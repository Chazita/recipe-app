import { Unit } from '../enum/unit.enum';
import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateIngredientDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @IsEnum(Unit)
  @IsNotEmpty()
  @ApiProperty()
  unit: Unit;
}

export default CreateIngredientDTO;
