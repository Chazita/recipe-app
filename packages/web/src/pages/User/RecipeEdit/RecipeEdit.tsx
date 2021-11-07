import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import apiRequest from "../../../utils/apiRequest";
import { Recipe } from "../../../types/Recipe";
import { Category } from "../../../types/Category.enum";
import { RecipeForm } from "../../../types/RecipeForm";
import { Typography } from "@mui/material";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import IngredientField from "../../../components/RecipeFieldForm/IngredientField";
import StepField from "../../../components/RecipeFieldForm/StepField";

import { styled, useTheme } from "@mui/material/styles";

const FormStyled = styled("form")`
	display: flex;
	flex-direction: column;
	text-align: center;
`;

function RecipeEdit() {
	const { id } = useParams<{ id: string }>();
	const history = useHistory();
	const {
		register,
		control,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<RecipeForm>();

	const editMutation = useMutation((updateRecipe: RecipeForm) => {
		return apiRequest({
			method: "PUT",
			url: "recipe",
			withCredentials: true,
			data: updateRecipe,
		});
	});

	const submitUpdate = (data: RecipeForm) => {
		editMutation.mutateAsync(data).then(() => {
			history.push(`/recipe-details/${data.id}`);
		});
	};

	useEffect(() => {
		apiRequest<Recipe>({
			method: "GET",
			url: `recipe/edit/my-recipe/${id}`,
			withCredentials: true,
		})
			.then(
				({ data: { ingredients, category, description, id, name, steps } }) => {
					setValue("name", name);
					setValue("description", description);
					setValue("category", category);
					setValue("ingredients", ingredients ? ingredients : []);
					setValue("steps", steps ? steps : []);
					setValue("id", id);
				}
			)
			.catch((error) => console.log(error));

		return () => {};
	}, [id]);

	const theme = useTheme();

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "calc(100vh - 56px)",
			}}
		>
			<FormStyled onSubmit={handleSubmit(submitUpdate)}>
				<Typography
					variant="h3"
					sx={{
						color: theme.palette.text.primary,
						marginBottom: "1rem",
						marginTop: "1rem",
					}}
				>
					Update Recipe
				</Typography>
				<TextField
					label="Name"
					variant="filled"
					defaultValue=" "
					inputProps={{ ...register("name") }}
					sx={{ marginBottom: "1rem" }}
				/>
				<TextField
					multiline
					maxRows={4}
					label="Description"
					variant="filled"
					defaultValue=" "
					inputProps={{ ...register("description") }}
					sx={{ marginBottom: "1rem" }}
				/>
				{getValues("category") ? (
					<FormControl variant="filled">
						<InputLabel id="category-label">Category</InputLabel>
						<Select
							labelId="category-label"
							defaultValue={getValues("category")}
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
				) : (
					<></>
				)}

				<IngredientField {...{ control, register }} />
				<StepField {...{ control, register }} />
				<Button
					type="submit"
					variant="contained"
					sx={{ marginBottom: "1rem", marginTop: "1rem" }}
				>
					Update Recipe
				</Button>
			</FormStyled>
		</Container>
	);
}

export default RecipeEdit;
