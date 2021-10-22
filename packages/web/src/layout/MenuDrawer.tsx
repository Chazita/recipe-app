import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { isLogIn, notLogIn, routes } from "../utils/arrayOfRoutes";

import Drawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { UserContext } from "../contexts/userContext";
import ModeSwitch from "./ModeSwitch";

import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import CloseIcon from "@mui/icons-material/close";
import SettingsIcon from "@mui/icons-material/Settings";
import UserSettings from "./UserSettings";

interface Props {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	justifyContent: "space-between",
	...theme.mixins.toolbar,
}));

function stringToColor(name: string) {
	let hash = 0;
	let i;

	for (i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.substr(-2);
	}

	return color;
}

function stringAvatar(name: string | undefined) {
	if (!name) {
		return {
			sx: {
				bgcolor: "#fff",
				children: "AA ",
			},
		};
	} else {
		return {
			sx: {
				bgcolor: stringToColor(name),
			},
			children: `${name.split(" ")[0][0]}`,
		};
	}
}

function MenuDrawer({ open, setOpen }: Props) {
	const { user } = useContext(UserContext);
	const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
	const settingsRef = useRef(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setUserMenu(event.currentTarget);
	};

	const handleClose = () => {
		setUserMenu(null);
	};

	let myRoutes = [];
	if (user) {
		myRoutes = routes.concat(isLogIn);
	} else {
		myRoutes = routes.concat(notLogIn);
	}

	return (
		<Drawer
			anchor="left"
			open={open}
			sx={{
				width: 200,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: 200,
					boxSizing: "border-box",
				},
			}}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
		>
			<DrawerHeader>
				<IconButton onClick={() => setOpen(false)}>
					<CloseIcon />
				</IconButton>
				<ModeSwitch />
			</DrawerHeader>
			<Divider />
			<List sx={{ flex: "auto" }}>
				{myRoutes.map((route) => (
					<ListItem
						sx={{ color: (theme) => theme.palette.text.primary }}
						key={route.path}
						component={Link}
						to={route.path}
						onClick={() => setOpen(false)}
					>
						<ListItemIcon>{route.icon}</ListItemIcon>
						<ListItemText primary={route.text} />
					</ListItem>
				))}
			</List>
			{user ? (
				<>
					<Divider sx={{ marginBottom: "0.4rem" }} />
					<ListItem
						secondaryAction={
							<IconButton edge="end" ref={settingsRef} onClick={handleClick}>
								<SettingsIcon />
							</IconButton>
						}
					>
						<UserSettings
							open={Boolean(userMenu)}
							handleClose={handleClose}
							anchorEl={userMenu}
							onClose={handleClose}
							anchorOrigin={{
								vertical: "top",
								horizontal: "center",
							}}
							transformOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}
						/>
						<ListItemAvatar>
							<Avatar {...stringAvatar(user.name)} />
						</ListItemAvatar>
						<ListItemText primary={user?.name} />
					</ListItem>
				</>
			) : (
				<></>
			)}
		</Drawer>
	);
}

export default MenuDrawer;
