import { Recipe } from '../../recipe/entities/recipe.entity';
import { Step } from '../../recipe/entities/step.entity';
import { Ingredient } from '../../recipe/entities/ingredient.entity';
import { Category } from '../../recipe/enum/category.enum';
import { stubUser } from './user.stub';
import { Unit } from '../../recipe/enum/unit.enum';

const recipe1 = new Recipe();
const recipe2 = new Recipe();

recipe1.name = 'Recipe1';
recipe1.description = 'Description1';
recipe1.category = Category.LUNCH;
recipe1.createdBy = stubUser;

recipe2.name = 'Recipe2';
recipe2.description = 'Description2';
recipe2.category = Category.BREAKFAST;
recipe2.createdBy = stubUser;

const ingredient1 = new Ingredient();
ingredient1.name = 'ingredient';
ingredient1.quantity = 200;
ingredient1.unit = Unit.G;

const step1 = new Step();
step1.stepNumber = 1;
step1.stepDescription = 'Step1';

export { recipe1, recipe2, step1, ingredient1 };
