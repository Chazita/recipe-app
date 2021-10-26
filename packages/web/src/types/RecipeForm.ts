import { Category } from "./Category.enum";
import { Ingredient } from "./Ingredient";
import { Step } from "./Step";

export type RecipeForm = {
	name: string;
	description: string;
	category: Category;
	ingredients: Ingredient[];
	steps: Step[];
};
