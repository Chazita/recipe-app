import { Unit } from '../enum/unit.enum';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  IsArray,
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
  @ApiProperty({ type: [UpdateIngredientDTO] })
  ingredients: UpdateIngredientDTO[];

  @IsArray()
  @ApiProperty({ type: [UpdateStepDTO] })
  steps: UpdateStepDTO[];
}

export default UpdateRecipeDTO;
