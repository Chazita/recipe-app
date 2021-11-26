import { useState, useContext, useRef } from "react";
import { UserContext } from "../contexts/userContext";
import { isLogIn, notLogIn, routes } from "../utils/arrayOfRoutes";
import { Link } from "react-router-dom";
import UserSettings from "./UserSettings";
import {
	avatarColorGenerator,
	avatarName,
} from "../utils/avatarAtributesGenerator";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import MenuDrawer from "./MenuDrawer";

const ButtonContainers = styled(Box)(({ theme }) => ({
	[theme.breakpoints.down("md")]: {
		display: "none",
	},
}));

const LinkStyled = styled(Link)(({ theme }) => ({
	textDecoration: "none",
	color: theme.palette.text.primary,
	marginRight: "1.5rem",
}));

interface Props {
	children: JSX.Element;
}

function NavBar({ children }: Props) {
	const [openDrawer, setOpenDrawer] = useState(false);
	const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
	const settingsRef = useRef(null);

	const openUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setUserMenu(event.currentTarget);
	};

	const closeUserMenu = () => {
		setUserMenu(null);
	};

	const { user } = useContext(UserContext);
	let myRoutes = [];

	if (user) {
		myRoutes = routes.concat(isLogIn);
	} else {
		myRoutes = routes.concat(notLogIn);
	}
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						sx={{ mr: 2, display: { md: "none" } }}
						onClick={() => setOpenDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Recipes
					</Typography>

					<ButtonContainers>
						{myRoutes.map((route) => (
							<LinkStyled key={route.text} to={route.path}>
								{route.text}
							</LinkStyled>
						))}
						{user ? (
							<>
								<IconButton onClick={openUserMenu}>
									<Avatar
										sx={{
											width: 30,
											height: 30,
											...avatarColorGenerator(user.name),
										}}
										{...avatarName(user.name)}
									/>
								</IconButton>
								<UserSettings
									open={Boolean(userMenu)}
									handleClose={closeUserMenu}
									anchorEl={userMenu}
									onClose={closeUserMenu}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right",
									}}
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
								/>
							</>
						) : (
							<></>
						)}
					</ButtonContainers>
				</Toolbar>
			</AppBar>
			{children}
			<MenuDrawer open={openDrawer} setOpen={setOpenDrawer} />
		</>
	);
}

export default NavBar;
