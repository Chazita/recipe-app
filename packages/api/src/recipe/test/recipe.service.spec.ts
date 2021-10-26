import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { TestUtils } from '../../utils/TestUtils';
import { DatabaseTestModule } from '../../database/database-test.module';
import { Ingredient } from '../entities/ingredient.entity';
import { Recipe } from '../entities/recipe.entity';
import { Step } from '../entities/step.entity';
import { User } from '../../users/user.entity';
import { RecipeService } from '../recipe.service';
import { Connection } from 'typeorm';

describe('The RecipeService', () => {
  let recipeService: RecipeService;
  let connection: TestUtils;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        DatabaseTestModule,
        TypeOrmModule.forFeature([Ingredient, Recipe, Step, User]),
      ],
      providers: [RecipeService],
    }).compile();
    recipeService = module.get(RecipeService);
    const connectionGet = module.get<Connection>(getConnectionToken());

    connection = new TestUtils(connectionGet);

    await connection.loadAll();
  });

  afterAll(async () => {
    await connection.reloadEntities();
    module.close();
  });

  it('should be defined', () => {
    expect(recipeService).toBeDefined();
  });

  it('should retun a array', async () => {
    expect(typeof (await recipeService.getAllRecipes())).toBe(typeof []);
  });
});
