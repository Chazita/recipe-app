import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "../layout/NavBar";
import UserRoute from "./UserRoute";

const Home = React.lazy(() => import("../pages/Home/Home"));
const RecipesList = React.lazy(
	() => import("../pages/RecipesList/RecipesList")
);
const RecipeDetails = React.lazy(
	() => import("../pages/RecipeDetails/RecipeDetails")
);

const CreateRecipe = React.lazy(
	() => import("../pages/CreateRecipe/CreateRecipe")
);
const Login = React.lazy(() => import("../pages/Login/Login"));
const SignUp = React.lazy(() => import("../pages/SignUp/SignUp"));
const MyRecipes = React.lazy(() => import("../pages/User/MyRecipes/MyRecipes"));
const RecipeEdit = React.lazy(
	() => import("../pages/User/RecipeEdit/RecipeEdit")
);

function Routes() {
	return (
		<BrowserRouter>
			<NavBar>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/recipes-list/:page" component={RecipesList} />
					<Route path="/recipe-details/:id" component={RecipeDetails} />

					<Route path="/login" component={Login} />
					<Route path="/sign-up" component={SignUp} />

					<UserRoute path="/user/my-recipes/:page" component={MyRecipes} />
					<UserRoute path="/user/recipe-edit/:id" component={RecipeEdit} />
					<UserRoute path="/recipe-create" component={CreateRecipe} />
				</Switch>
			</NavBar>
		</BrowserRouter>
	);
}

export default Routes;
