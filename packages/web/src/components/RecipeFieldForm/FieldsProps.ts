import { Control, UseFormRegister } from "react-hook-form";
import { RecipeForm } from "../../types/RecipeForm";

export type FieldsProps = {
	control: Control<RecipeForm>;
	register: UseFormRegister<RecipeForm>;
};
