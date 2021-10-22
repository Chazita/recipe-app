import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import CreateRecipeDTO from './dto/CreateRecipe.dto';
import { Ingredient } from './entities/ingredient.entity';
import { Recipe } from './entities/recipe.entity';
import { Step } from './entities/step.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    @InjectRepository(Step) private stepRepository: Repository<Step>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  getAllRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async getRecipeById(id: number) {
    try {
      const recipe = await this.recipeRepository.findOne(id, {
        relations: ['ingredients', 'steps'],
      });
      if (recipe) {
        return recipe;
      }

      throw new HttpException('Post not Found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createRecipe(recipe: CreateRecipeDTO, user: User) {
    try {
      const newRecipe = this.recipeRepository.create(recipe);
      newRecipe.createdBy = user;
      const saveRecipe = await this.recipeRepository.save(newRecipe);

      const newIngredients = this.ingredientRepository.create(
        recipe.ingredients,
      );
      const newSteps = this.stepRepository.create(recipe.steps);

      newIngredients.map((value) => {
        value.recipes = saveRecipe;
      });
      newSteps.map((value) => (value.recipes = saveRecipe));

      await this.ingredientRepository.save(newIngredients);
      await this.stepRepository.save(newSteps);
    } catch (error) {
      throw new HttpException(error.toString(), HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async updateRecipe(recipe: Recipe) {
    try {
      await this.recipeRepository.save(recipe);
      await this.ingredientRepository.save(recipe.ingredients);
      await this.stepRepository.save(recipe.steps);
    } catch (error) {
      throw new HttpException(error.toString(), HttpStatus.NOT_MODIFIED);
    }
  }

  async deleteRecipe(id: number) {
    try {
      const recipe = await this.getRecipeById(id);
      await this.ingredientRepository.remove(recipe.ingredients);
      await this.stepRepository.remove(recipe.steps);
      await this.recipeRepository.remove(recipe);
    } catch (error) {
      throw new HttpException(error.toString(), HttpStatus.NOT_IMPLEMENTED);
    }
  }
}
