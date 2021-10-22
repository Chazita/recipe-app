import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from '../recipe/entities/ingredient.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { Step } from '../recipe/entities/step.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      database: 'recipes_test',
      username: 'postgres',
      password: 'chaza123',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Recipe, Ingredient, Step],
    }),
  ],
})
export class DatabaseTestModule {}
