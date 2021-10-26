import { User } from '../users/user.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { Step } from '../recipe/entities/step.entity';
import { Ingredient } from '../recipe/entities/ingredient.entity';
import { Connection } from 'typeorm';
import { stubUser } from './stubs/user.stub';
import { ingredient1, recipe1, recipe2, step1 } from './stubs/recipe.stub';

type EntityValues = {
  name: string;
  tableName: string;
};

export class TestUtils {
  connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  closeDb() {
    if (this.connection.isConnected) {
      this.connection.close();
    }
  }

  getEntities(): EntityValues[] {
    return this.connection.entityMetadatas.map((entity) => {
      return { name: entity.name, tableName: entity.tableName };
    });
  }

  /**
   * Clean the database and load all entities
   */
  async reloadEntities() {
    try {
      const entities = this.getEntities();
      await this.cleanAll(entities);
    } catch (error) {
      console.log(error);
    }
  }

  async cleanAll(entities: EntityValues[]) {
    try {
      let allEntities: string;
      for (const entity of entities) {
        allEntities += `${this.connection.getRepository(entity.name)},`;
      }
      allEntities.slice(0, -1);
      await this.connection.query(
        `TRUNCATE TABLE ${allEntities} RESTART IDENTITY;`,
      );
    } catch (error) {
      throw new Error(
        `ERROR [TestUtils.cleanAll]: to cleaning db:${error.message}`,
      );
    }
  }

  async loadAll() {
    try {
      const recipeRepostiroy = this.connection.getRepository(Recipe);
      const ingreRepository = this.connection.getRepository(Ingredient);
      const stepRepository = this.connection.getRepository(Step);

      const recipe1Res = await recipeRepostiroy.save(recipe1);
      const recipe2Res = await recipeRepostiroy.save(recipe2);

      ingredient1.recipes = recipe1Res;
      await ingreRepository.save([ingredient1, ingredient1]);

      ingredient1.recipes = recipe2Res;
      await ingreRepository.save([ingredient1]);

      step1.recipes = recipe1Res;
      await stepRepository.save(step1);

      step1.recipes = recipe2Res;
      await stepRepository.save(step1);
    } catch (error) {
      throw new Error(
        `ERROR [TestUtils.loadAll]: to load all the data on db: ${error}`,
      );
    }
  }

  async loadUser() {
    try {
      await this.connection.getRepository(User).save(stubUser);
    } catch (error) {
      throw new Error(
        `ERROR [TestUtils.loadUser]: to load data on db: ${error}`,
      );
    }
  }
}
