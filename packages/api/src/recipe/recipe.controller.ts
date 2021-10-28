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
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import CreateRecipeDTO from './dto/CreateRecipe.dto';
import { RecipeService } from './recipe.service';
import FindOneParam from '../utils/findOneParam';
import AuthenticationGuard from '../authentication/authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { PaginationParams } from 'src/utils/paginationParams';
import PaginationResponse from './response/paginationResponse';
import UpdateRecipeDTO from './dto/UpdateRecipe.dto';

@ApiTags('Recipes')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  // @Get()
  // async getAllRecipes() {
  //   return await this.recipeService.getAllRecipes();
  // }

  @HttpCode(200)
  @Get()
  async getAllRecipeWithQuery(@Query() query: PaginationParams) {
    const { data, page } = await this.recipeService.getRecipeWithPagination(
      query,
    );

    return PaginationResponse(data, page);
  }

  @HttpCode(200)
  @Get(':id')
  async getRecipeById(@Param() { id }: FindOneParam) {
    const recipes = await this.recipeService.getRecipeById(+id);
    return recipes;
  }

  // when a insert a recipe the entire server crash
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
  @Put()
  async updateRecipe(@Body() recipe: UpdateRecipeDTO) {
    await this.recipeService.updateRecipe(recipe);
    return;
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteRecipe(@Param('id') { id }: FindOneParam) {
    await this.recipeService.deleteRecipe(+id);
    return;
  }
}
