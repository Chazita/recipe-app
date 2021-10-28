import { Unit } from '../enum/unit.enum';
import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UpdateIngredientDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

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

export default UpdateIngredientDTO;
