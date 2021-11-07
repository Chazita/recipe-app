import { useParams } from "react-router";
import { useQuery } from "react-query";
import apiRequest from "../../utils/apiRequest";
import { Recipe } from "../../types/Recipe";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function RecipeDetails() {
	const { id } = useParams<{ id: string }>();
	const { data } = useQuery("recipe-details", async () => {
		return (
			await apiRequest<Recipe>({ method: "GET", url: `recipe/details/${id}` })
		).data;
	});

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "calc(100vh - 56px)",
				color: (theme) => theme.palette.text.primary,
			}}
		>
			<Typography variant="h3" alignSelf="center" sx={{ marginTop: "1rem" }}>
				{data?.name}
			</Typography>
			<Typography variant="body1" sx={{ marginTop: "1rem" }}>
				{data?.description}
			</Typography>
			<Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
			<Typography variant="h4"> Ingredients </Typography>
			<List>
				{data?.ingredients?.map((ingredient) => (
					<ListItem key={ingredient.id}>
						<ListItemText
							primary={`${ingredient.quantity} ${ingredient.unit} ${ingredient.name} `}
						/>
					</ListItem>
				))}
			</List>
			<Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
			<Typography variant="h4">Steps</Typography>
			<List>
				{data?.steps?.map((step) => (
					<ListItem key={step.id}>
						<ListItemText
							secondary={step.stepDescription}
							primary={`Step ${step.stepNumber}`}
						/>
					</ListItem>
				))}
			</List>
		</Container>
	);
}

export default RecipeDetails;
