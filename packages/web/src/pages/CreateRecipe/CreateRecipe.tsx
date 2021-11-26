import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import apiRequest from "../../utils/apiRequest";
import { Category } from "../../types/Category.enum";
import { RecipeForm } from "../../types/RecipeForm";
import { Typography } from "@mui/material";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";

import IngredientField from "../../components/RecipeFieldForm/IngredientField";
import StepField from "../../components/RecipeFieldForm/StepField";

import { styled, useTheme } from "@mui/material/styles";
import MyContainer from "../../components/MyContainer/MyContainer";

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
		formState,
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
		<MyContainer
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "calc(100vh - 56px)",
			}}
			maxWidth="xl"
		>
			<FormStyled onSubmit={handleSubmit(createSubmit)}>
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
							Create Recipe
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
							{...register("name", {
								required: { value: true, message: "The name is required." },
								maxLength: {
									value: 100,
									message: "The name must have less than 100 characters.",
								},
							})}
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
							{...register("description", {
								required: {
									value: true,
									message: "The description is required.",
								},
								maxLength: {
									value: 500,
									message:
										"The description must have less than 500 characters.",
								},
							})}
							sx={{ marginBottom: "1rem" }}
							error={errors.description ? true : false}
							helperText={errors.description?.message}
							fullWidth
						/>
						<FormControl
							variant="filled"
							fullWidth
							error={errors.category ? true : false}
						>
							<InputLabel id="category-label">Category</InputLabel>
							<Select
								labelId="category-label"
								defaultValue=""
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
							<FormHelperText> {errors.category?.message} </FormHelperText>
						</FormControl>
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
							Create Recipe
						</Button>
					</Grid>
				</Grid>
			</FormStyled>
		</MyContainer>
	);
}

export default CreateRecipe;
