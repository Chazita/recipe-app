import { createElement, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

function UserRoute({ component, ...rest }: any) {
	const { user } = useContext(UserContext);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				user ? (
					createElement(component)
				) : (
					<Redirect to={{ pathname: "/login", state: { from: location } }} />
				)
			}
		/>
	);
}

export default UserRoute;
