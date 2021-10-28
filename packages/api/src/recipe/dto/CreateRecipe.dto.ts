import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Category } from '../enum/category.enum';
import CreateIngredientDTO from './CreateIngredient.dto';
import CreateStepDTO from './CreateStep.dto';
import { ApiProperty } from '@nestjs/swagger';

class CreateRecipeDTO {
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
  @ApiProperty({ type: [CreateIngredientDTO] })
  ingredients: CreateIngredientDTO[];

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: [CreateStepDTO] })
  steps: CreateStepDTO[];
}

export default CreateRecipeDTO;
