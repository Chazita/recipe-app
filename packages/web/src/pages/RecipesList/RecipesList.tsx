import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";
import { Recipe } from "../../types/Recipe";

import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Pagination from "@mui/material/Pagination";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PaginationItem from "@mui/material/PaginationItem";

type QueryResponse = {
	recipes: Recipe[];
	count: number;
	currentPage: number;
	nextPage: number;
	prevPage: number;
	lastPage: number;
};

function RecipesList() {
	const { page } = useParams<{ page: string }>();
	const { data } = useQuery(["recipe", page], async () => {
		const result = await apiRequest<QueryResponse>({
			url: `recipe?page=${page}`,
		});
		return result;
	});

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
						<Card
							sx={{ width: "100%", textDecoration: "none" }}
							component={Link}
							to={`/recipe-details/${recipe.id}`}
						>
							<CardContent>
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

export default RecipesList;
