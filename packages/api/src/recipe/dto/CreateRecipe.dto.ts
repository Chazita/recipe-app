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

class CreateRecipeDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Category)
  category: Category;

  @IsArray()
  @ArrayMinSize(1)
  ingredients: CreateIngredientDTO[];

  @IsArray()
  @ArrayMinSize(1)
  steps: CreateStepDTO[];
}

export default CreateRecipeDTO;
