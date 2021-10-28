import { Unit } from '../enum/unit.enum';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Category } from '../enum/category.enum';
import UpdateStepDTO from './UpdateStep.dto';
import UpdateIngredientDTO from './UpdateIngredient.dto';

class UpdateRecipeDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsEnum(Category)
  @ApiProperty()
  category: Category;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: [UpdateIngredientDTO] })
  ingredients: UpdateIngredientDTO[];

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: [UpdateStepDTO] })
  steps: UpdateStepDTO[];
}

export default UpdateRecipeDTO;
