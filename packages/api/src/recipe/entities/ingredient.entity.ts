import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from 'typeorm';
import { Unit } from '../enum/unit.enum';
import { Recipe } from './recipe.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  name: string;

  @Column({ type: 'float' })
  quantity: number;

  @Column({ type: 'enum', enum: Unit, default: Unit.NONE })
  unit: Unit;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  recipes: Recipe;
}
