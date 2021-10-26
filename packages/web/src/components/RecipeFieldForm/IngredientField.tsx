import { useFieldArray } from "react-hook-form";
import { Unit } from "../../types/Unit.enum";
import enumToArray from "../../utils/enumToArray";

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

function IngredientField({ control, register }: FieldsProps) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: "ingredients",
	});
	const theme = useTheme();
	return (
		<>
			<Typography
				variant="h4"
				sx={{
					color: theme.palette.text.primary,
					marginTop: "1rem",
				}}
			>
				Ingredients
			</Typography>

			<List>
				{fields.map((ingredient, index) => (
					<ListItem key={ingredient.id}>
						<FieldsContainer>
							<TextField
								label="Name"
								variant="filled"
								inputProps={{ ...register(`ingredients.${index}.name`) }}
							/>

							<SelectQuantityContainer>
								<TextField
									label="Quantity"
									type="number"
									variant="filled"
									sx={{ width: "90%" }}
									inputProps={{ ...register(`ingredients.${index}.quantity`) }}
								/>
								<Select
									defaultValue=""
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
						</FieldsContainer>
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

			<Button variant="contained" onClick={() => append({})}>
				Add Ingredient
			</Button>
		</>
	);
}

export default IngredientField;
