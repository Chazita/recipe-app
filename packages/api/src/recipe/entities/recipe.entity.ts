import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Category } from '../enum/category.enum';
import { Ingredient } from './ingredient.entity';
import { Step } from './step.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @ManyToOne(() => User, (user) => user.recipes)
  createdBy: User;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipes)
  ingredients: Ingredient[];

  @OneToMany(() => Step, (step) => step.recipes)
  steps: Step[];
}
