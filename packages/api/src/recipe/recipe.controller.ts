import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import CreateRecipeDTO from './dto/CreateRecipe.dto';
import { Response } from 'express';
import { Recipe } from './entities/recipe.entity';
import { RecipeService } from './recipe.service';
import FindOneParam from '../utils/findOneParam';
import AuthenticationGuard from '../authentication/authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async getAllRecipes() {
    return await this.recipeService.getAllRecipes();
  }

  @Get(':id')
  async getRecipeById(@Param('id') { id }: FindOneParam, @Res() res: Response) {
    try {
      const recipes = await this.recipeService.getRecipeById(Number(id));

      return res.status(HttpStatus.OK).json(recipes);
    } catch (error) {
      const e = error as HttpException;
      return res.status(e.getStatus()).json({ message: e.getResponse() });
    }
  }

  @HttpCode(204)
  @UseGuards(AuthenticationGuard)
  @Post()
  async createRecipe(
    @Body() recipe: CreateRecipeDTO,
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    try {
      await this.recipeService.createRecipe(recipe, req.user);

      return res.status(204).send();
    } catch (error) {
      const e = error as HttpException;
      return res.status(e.getStatus()).json({ message: e.getResponse() });
    }
  }

  @HttpCode(204)
  @Put()
  async updateRecipe(@Body() recipe: Recipe, @Res() res: Response) {
    try {
      await this.recipeService.updateRecipe(recipe);
      return res.status(204).send();
    } catch (error) {
      const e = error as HttpException;
      return res.status(e.getStatus()).json({ message: e.getResponse() });
    }
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteRecipe(@Param('id') { id }: FindOneParam, @Res() res: Response) {
    try {
      await this.recipeService.deleteRecipe(+id);
      return res.status(204).send();
    } catch (error) {
      const e = error as HttpException;
      return res.status(e.getStatus()).json({ message: e.getResponse() });
    }
  }
}
