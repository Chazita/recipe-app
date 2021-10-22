import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Recipe } from '../recipe/entities/recipe.entity';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 200 })
  email: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 200 })
  @Exclude()
  password: string;

  @OneToMany(() => Recipe, (recipe) => recipe.createdBy)
  recipes: Recipe[];

  @BeforeInsert()
  private async beforeInsert() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
