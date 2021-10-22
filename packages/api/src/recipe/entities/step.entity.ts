import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stepNumber: number;

  @Column({ length: 500 })
  stepDescription: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.steps)
  recipes: Recipe;
}
