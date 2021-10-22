import { Test } from '@nestjs/testing';
import { RecipeController } from '../recipe.controller';
import { RecipeService } from '../recipe.service';

describe('The Recipe Controller', () => {
  let recipeController: RecipeController;
  let spyRecipe: RecipeService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        { provide: RecipeService, useValue: {} },
        { provide: RecipeService, useValue: {} },
      ],
    }).compile();
    recipeController = module.get(RecipeController);
    spyRecipe = module.get(RecipeService);
  });

  it('should be defined', () => {
    expect(recipeController).toBeDefined();
    expect(spyRecipe).toBeDefined();
  });
});
