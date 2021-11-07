import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import CreateRecipeDTO from './dto/CreateRecipe.dto';
import { Ingredient } from './entities/ingredient.entity';
import { Recipe } from './entities/recipe.entity';
import { Step } from './entities/step.entity';
import { PaginationParams } from 'src/utils/paginationParams';
import UpdateRecipeDTO from './dto/UpdateRecipe.dto';

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

  async getRecipeWithPagination(query: PaginationParams) {
    const page = Number(query.page) || 1;
    const skip = (page - 1) * 10;

    const data = await this.recipeRepository.findAndCount({
      order: { id: 'DESC' },
      take: 10,
      skip,
    });

    return { data, page };
  }

  async getRecipeWithPaginationUser(query: PaginationParams, user: User) {
    const page = Number(query.page) || 1;
    const skip = (page - 1) * 10;

    const data = await this.recipeRepository
      .findAndCount({
        order: { id: 'DESC' },
        take: 10,
        skip,
        relations: ['createdBy'],
        loadRelationIds: true,
        where: { createdBy: user.id },
      })
      .catch((error) => console.log(error));

    if (data) return { data, page };
  }

  async getRecipeForEdit(id: number, user: User) {
    const recipe = await this.recipeRepository
      .findOne(id, {
        relations: ['createdBy', 'ingredients', 'steps'],
        where: { createdBy: user.id },
      })
      .catch((error) => {
        throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
      });

    if (!recipe) {
      throw new HttpException(
        "The recipe doesn't exist or you don't have the requirements to modified it",
        HttpStatus.BAD_REQUEST,
      );
    }

    return recipe;
  }

  async createRecipe(recipe: CreateRecipeDTO, user: User) {
    try {
      const newRecipe = this.recipeRepository.create(recipe);
      newRecipe.createdBy = user;
      await this.recipeRepository.save(newRecipe);
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateRecipe(recipe: UpdateRecipeDTO) {
    try {
      await this.recipeRepository.save(recipe);
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteRecipe(id: number, user: User) {
    try {
      const recipe = await this.recipeRepository.findOne(id, {
        relations: ['createdBy', 'ingredients', 'steps'],
      });
      if (recipe.createdBy.id === user.id) {
        await this.recipeRepository.remove(recipe);
      }
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteIngredient(ingredients: Ingredient[]) {
    try {
      await this.ingredientRepository.remove(ingredients);
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteSteps(steps: Step[]) {
    try {
      await this.stepRepository.remove(steps);
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
