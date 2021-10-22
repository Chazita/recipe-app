import { Unit } from '../enum/unit.enum';
import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';

class CreateIngredientDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsEnum(Unit)
  @IsNotEmpty()
  unit: Unit;
}

export default CreateIngredientDTO;
