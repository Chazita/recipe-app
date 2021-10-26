import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "../layout/NavBar";
import UserRoute from "./UserRoute";

import Home from "../pages/Home/Home";
import RecipesList from "../pages/RecipesList/RecipesList";
const CreateRecipe = React.lazy(
	() => import("../pages/CreateRecipe/CreateRecipe")
);
const Login = React.lazy(() => import("../pages/Login/Login"));
const SignUp = React.lazy(() => import("../pages/SignUp/SignUp"));

function Routes() {
	return (
		<BrowserRouter>
			<NavBar>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/recipes-list" component={RecipesList} />
					<Route path="/login" component={Login} />
					<Route path="/sign-up" component={SignUp} />
					<UserRoute path="/recipe-create" component={CreateRecipe} />
				</Switch>
			</NavBar>
		</BrowserRouter>
	);
}

export default Routes;
