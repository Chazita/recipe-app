import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import CreateRecipeDTO from './dto/CreateRecipe.dto';
import { RecipeService } from './recipe.service';
import FindOneParam from '../utils/findOneParam';
import AuthenticationGuard from '../authentication/authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { PaginationParams } from '../utils/paginationParams';
import PaginationResponse from './response/paginationResponse';
import UpdateRecipeDTO from './dto/UpdateRecipe.dto';
import { User } from '../users/user.entity';
import { Ingredient } from './entities/ingredient.entity';
import { Step } from './entities/step.entity';

@ApiTags('Recipes')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @HttpCode(200)
  @Get()
  async getAllRecipeWithQuery(@Query() query: PaginationParams) {
    const { data, page } = await this.recipeService.getRecipeWithPagination(
      query,
    );

    return PaginationResponse(data, page);
  }

  @HttpCode(200)
  @Get('details/:id')
  async getRecipeById(@Param() { id }: FindOneParam) {
    const recipes = await this.recipeService.getRecipeById(+id);
    return recipes;
  }

  @HttpCode(200)
  @UseGuards(AuthenticationGuard)
  @Get('my-recipes')
  async getMyRecipes(
    @Query() query: PaginationParams,
    @Req() req: RequestWithUser,
  ) {
    const { data, page } = await this.recipeService.getRecipeWithPaginationUser(
      query,
      req.user as User,
    );
    return PaginationResponse(data, page);
  }

  @HttpCode(204)
  @UseGuards(AuthenticationGuard)
  @Post()
  async createRecipe(
    @Body() recipe: CreateRecipeDTO,
    @Req() req: RequestWithUser,
  ) {
    await this.recipeService.createRecipe(recipe, req.user);

    return;
  }

  @HttpCode(204)
  @UseGuards(AuthenticationGuard)
  @Put()
  async updateRecipe(
    @Body() recipe: UpdateRecipeDTO,
    @Req() req: RequestWithUser,
  ) {
    //check if the the recipe owner is the same one who try to edit or update the data.
    const { ingredients, steps } = (await this.recipeService.getRecipeForEdit(
      recipe.id,
      req.user,
    )) as UpdateRecipeDTO;

    const ingredientsToDelete = ingredients.filter(
      (ingredient) =>
        !recipe.ingredients.some(
          (ingredient2) => ingredient.id === ingredient2.id,
        ),
    );

    const stepsToDelete = steps.filter(
      (step) => !recipe.steps.some((step2) => step.id === step2.id),
    );

    if (ingredients.length > 0) {
      this.recipeService.deleteIngredient(ingredientsToDelete as Ingredient[]);
    }

    if (steps.length > 0) {
      this.recipeService.deleteSteps(stepsToDelete as Step[]);
    }

    await this.recipeService.updateRecipe(recipe);

    return;
  }

  @HttpCode(200)
  @UseGuards(AuthenticationGuard)
  @Get('edit/my-recipe/:id')
  async getRecipeforEdit(
    @Param() { id }: FindOneParam,
    @Req() req: RequestWithUser,
  ) {
    return await this.recipeService.getRecipeForEdit(+id, req.user);
  }

  @HttpCode(204)
  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  async deleteRecipe(
    @Param() { id }: FindOneParam,
    @Req() req: RequestWithUser,
  ) {
    await this.recipeService.deleteRecipe(+id, req.user as User);
    return;
  }
}
