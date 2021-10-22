import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ingredient } from '../entities/ingredient.entity';
import { Recipe } from '../entities/recipe.entity';
import { Step } from '../entities/step.entity';
import { RecipeService } from '../recipe.service';
import mockedRecipeRepository from './mocks/recipeRepository.mock';

describe('The RecipeService', () => {
  let recipeService: RecipeService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: getRepositoryToken(Recipe),
          useValue: mockedRecipeRepository,
        },
        { provide: getRepositoryToken(Step), useValue: {} },
        { provide: getRepositoryToken(Ingredient), useValue: {} },
      ],
    }).compile();
    recipeService = module.get(RecipeService);
  });

  it('should be defined', () => {
    expect(recipeService).toBeDefined();
  });

  it('should retun a array', async () => {
    expect(typeof (await recipeService.getAllRecipes())).toBe(typeof []);
  });
});
