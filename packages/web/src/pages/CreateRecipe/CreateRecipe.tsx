import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import apiRequest from "../../utils/apiRequest";
import { Category } from "../../types/Category.enum";
import { RecipeForm } from "../../types/RecipeForm";
import { Typography } from "@mui/material";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import IngredientField from "../../components/RecipeFieldForm/IngredientField";
import StepField from "../../components/RecipeFieldForm/StepField";

import { styled, useTheme } from "@mui/material/styles";

const FormStyled = styled("form")`
	display: flex;
	flex-direction: column;
	text-align: center;
`;

function CreateRecipe() {
	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<RecipeForm>();
	const theme = useTheme();

	const createMutation = useMutation((newRecipe: RecipeForm) =>
		apiRequest({
			url: "recipe",
			method: "POST",
			withCredentials: true,
			data: newRecipe,
		}).then((result) => {
			if (result.status === 204) {
				reset();
			}
		})
	);

	const createSubmit = (data: RecipeForm) => {
		createMutation.mutate({ ...data });
	};

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "calc(100vh - 56px)",
			}}
		>
			<FormStyled onSubmit={handleSubmit(createSubmit)}>
				<Typography
					variant="h3"
					sx={{
						color: theme.palette.text.primary,
						marginBottom: "1rem",
						marginTop: "1rem",
					}}
				>
					Create Recipe
				</Typography>
				<TextField
					label="Name"
					variant="filled"
					{...register("name")}
					sx={{ marginBottom: "1rem" }}
				/>
				<TextField
					multiline
					maxRows={4}
					label="Description"
					variant="filled"
					{...register("description")}
					sx={{ marginBottom: "1rem" }}
				/>
				<FormControl variant="filled">
					<InputLabel id="category-label">Category</InputLabel>
					<Select
						labelId="category-label"
						defaultValue=""
						{...register("category")}
						sx={{ textAlign: "left" }}
					>
						<MenuItem value="" disabled>
							---
						</MenuItem>
						<MenuItem value={Category.BREAKFAST}>Breakfast</MenuItem>
						<MenuItem value={Category.LUNCH}>Lunch</MenuItem>
						<MenuItem value={Category.SUPPER}>Supper</MenuItem>
						<MenuItem value={Category.SNACK}>Snack</MenuItem>
					</Select>
				</FormControl>

				<IngredientField {...{ control, register }} />
				<StepField {...{ control, register }} />
				<Button
					type="submit"
					variant="contained"
					sx={{ marginBottom: "1rem", marginTop: "1rem" }}
				>
					Create Recipe
				</Button>
			</FormStyled>
		</Container>
	);
}

export default CreateRecipe;
