import { Unit } from "./Unit.enum";

export interface Ingredient {
	id?: number;
	name: string;
	quantity: number;
	unit: Unit;
}
