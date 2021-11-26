import { useFieldArray } from "react-hook-form";
import { Unit } from "../../types/Unit.enum";
import enumToArray from "../../utils/enumToArray";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTheme, styled } from "@mui/material/styles";

import { FieldsProps } from "./FieldsProps";

const UNIT_ARRAY = enumToArray(Unit);

const FieldsContainer = styled("div")`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const SelectQuantityContainer = styled("div")`
	display: flex;
	flex-direction: row;
	width: 100%;
`;

function IngredientField({
	control,
	register,
	formState: { errors },
}: FieldsProps) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: "ingredients",
	});
	const theme = useTheme();
	return (
		<Grid container item>
			<Grid item xs={12}>
				<Typography
					variant="h4"
					sx={{
						color: theme.palette.text.primary,
						marginTop: "1rem",
					}}
				>
					Ingredients
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<List>
					{fields.map((ingredient, index) => (
						<ListItem key={ingredient.id}>
							<Grid container item xs={12} direction="column">
								<TextField
									label="Name"
									variant="filled"
									inputProps={{
										...register(`ingredients.${index}.name`, {
											required: {
												value: true,
												message: "The name is required",
											},
											maxLength: {
												value: 40,
												message: "The name can't have more than 40 characters.",
											},
										}),
									}}
									error={
										errors.ingredients && errors.ingredients[index].name
											? true
											: false
									}
									helperText={
										errors.ingredients && errors.ingredients[index].name
											? errors.ingredients[index].name?.message
											: ""
									}
									fullWidth
								/>

								<SelectQuantityContainer>
									<TextField
										label="Quantity"
										type="number"
										variant="filled"
										sx={{ width: "90%" }}
										inputProps={{
											...register(`ingredients.${index}.quantity`, {
												required: {
													value: true,
													message: "The quantity is required",
												},
											}),
										}}
										error={
											errors.ingredients && errors.ingredients[index].quantity
												? true
												: false
										}
										helperText={
											errors.ingredients && errors.ingredients[index].quantity
												? errors.ingredients[index].quantity?.message
												: ""
										}
									/>
									<Select
										defaultValue={ingredient.unit}
										{...register(`ingredients.${index}.unit`)}
										sx={{ width: "40%" }}
										variant="filled"
									>
										{UNIT_ARRAY.map((unit) => (
											<MenuItem key={unit.value} value={unit.value}>
												{unit.key}
											</MenuItem>
										))}
									</Select>
								</SelectQuantityContainer>
							</Grid>
							<Button
								variant="contained"
								color="error"
								onClick={() => remove(index)}
							>
								Delete
							</Button>
						</ListItem>
					))}
				</List>
			</Grid>

			<Button
				variant="contained"
				onClick={() => append({ unit: Unit.NONE })}
				fullWidth
			>
				Add Ingredient
			</Button>
		</Grid>
	);
}

export default IngredientField;
