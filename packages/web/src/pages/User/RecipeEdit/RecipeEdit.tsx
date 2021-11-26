import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import apiRequest from "../../../utils/apiRequest";
import { Recipe } from "../../../types/Recipe";
import { Category } from "../../../types/Category.enum";
import { RecipeForm } from "../../../types/RecipeForm";
import { Typography } from "@mui/material";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import IngredientField from "../../../components/RecipeFieldForm/IngredientField";
import StepField from "../../../components/RecipeFieldForm/StepField";
import MyContainer from "../../../components/MyContainer/MyContainer";

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
		formState,
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
		<MyContainer
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "calc(100vh - 56px)",
			}}
			maxWidth="xl"
		>
			<FormStyled onSubmit={handleSubmit(submitUpdate)}>
				<Grid
					container
					direction="row"
					justifyContent="center"
					alignItems="start"
					spacing={2}
				>
					<Grid item xs={12}>
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
					</Grid>
					<Grid container item xs={12} sm={6} md={4}>
						<Grid item xs={12}>
							<Typography
								variant="h4"
								sx={{
									color: theme.palette.text.primary,
									marginTop: "1rem",
								}}
							>
								Details
							</Typography>
						</Grid>
						<TextField
							label="Name"
							variant="filled"
							defaultValue=" "
							inputProps={{
								...register("name", {
									required: { value: true, message: "The name is required." },
									maxLength: {
										value: 100,
										message: "The name must have less than 100 characters.",
									},
								}),
							}}
							sx={{ marginBottom: "1rem" }}
							error={errors.name ? true : false}
							helperText={errors.name?.message}
							fullWidth
						/>
						<TextField
							multiline
							maxRows={4}
							label="Description"
							variant="filled"
							defaultValue=" "
							inputProps={{
								...register("description", {
									required: {
										value: true,
										message: "The description is required.",
									},
									maxLength: {
										value: 500,
										message:
											"The description must have less than 500 characters.",
									},
								}),
							}}
							sx={{ marginBottom: "1rem" }}
							error={errors.description ? true : false}
							helperText={errors.description?.message}
							fullWidth
						/>
						{getValues("category") ? (
							<FormControl
								variant="filled"
								fullWidth
								error={errors.category ? true : false}
							>
								<InputLabel id="category-label">Category</InputLabel>
								<Select
									labelId="category-label"
									defaultValue={getValues("category")}
									{...register("category", {
										required: {
											value: true,
											message: "The category is required.",
										},
									})}
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
					</Grid>

					<Grid container item xs={12} sm={6} md={4}>
						<IngredientField {...{ control, register, formState }} />
					</Grid>

					<Grid container item xs={12} sm={12} md={4}>
						<StepField {...{ control, register, formState }} />
					</Grid>

					<Grid item xs={12}>
						<Button
							type="submit"
							variant="contained"
							sx={{ marginBottom: "1rem", marginTop: "1rem" }}
							fullWidth
						>
							Update Recipe
						</Button>
					</Grid>
				</Grid>
			</FormStyled>
		</MyContainer>
	);
}

export default RecipeEdit;
