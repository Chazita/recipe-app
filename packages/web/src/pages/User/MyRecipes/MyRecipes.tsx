import { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useQuery } from "react-query";
import apiRequest from "../../../utils/apiRequest";
import { Recipe } from "../../../types/Recipe";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import DeleteDialog from "./DeleteDialog";

type QueryResponse = {
	recipes: Recipe[];
	count: number;
	currentPage: number;
	nextPage: number;
	prevPage: number;
	lastPage: number;
};

function MyRecipes() {
	const history = useHistory();
	const [openDialog, setOpenDialog] = useState(false);
	const { page } = useParams<{ page: string }>();
	const { data } = useQuery(["my-recipe", page], async () => {
		const result = await apiRequest<QueryResponse>({
			url: `recipe/my-recipes?page=${page}`,
			method: "GET",
			withCredentials: true,
		});
		return result;
	});

	const redirectToDetails = (id: number) => {
		history.push(`/recipe-details/${id}`);
	};

	const redirecToEdit = (id: number) => {
		history.push(`/user/recipe-edit/${id}`);
	};

	const deleteRecipe = (id: number) => {
		if (data) {
			data.data.recipes = data?.data.recipes.filter((value) => value.id !== id);
		}
	};

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "calc(100vh - 56px)",
				alignContent: "center",
			}}
		>
			<List sx={{ flexGrow: 1 }}>
				{data?.data.recipes.map((recipe) => (
					<ListItem key={recipe.id}>
						<Card sx={{ width: "100%" }}>
							<CardContent onClick={() => redirectToDetails(recipe.id)}>
								<Typography variant="h5"> {recipe.name} </Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{
										wordBreak: "break-word",
										textOverflow: "ellipsis",
										overflow: "hidden",
										whiteSpace: "nowrap",
									}}
								>
									{recipe.description}
								</Typography>
							</CardContent>
							<CardActions>
								<Button color="info" onClick={() => redirecToEdit(recipe.id)}>
									Edit
								</Button>
								<Button color="error" onClick={() => setOpenDialog(true)}>
									Delete
								</Button>
								<DeleteDialog
									open={openDialog}
									setOpen={setOpenDialog}
									recipe={recipe}
									deleteRecipe={deleteRecipe}
								/>
							</CardActions>
						</Card>
					</ListItem>
				))}
			</List>

			<Pagination
				sx={{ alignSelf: "center", justifySelf: "end", marginBottom: "1rem" }}
				size="medium"
				page={+page}
				count={data?.data.lastPage}
				siblingCount={1}
				shape="rounded"
				variant="outlined"
				renderItem={(item) => (
					<PaginationItem
						component={Link}
						to={`/recipes-list/${item.page}`}
						{...item}
					/>
				)}
			/>
		</Container>
	);
}
export default MyRecipes;
