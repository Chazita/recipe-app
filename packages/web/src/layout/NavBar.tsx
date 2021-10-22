import { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { UserContext } from "../contexts/userContext";

import MenuIcon from "@mui/icons-material/Menu";
import MenuDrawer from "./MenuDrawer";

const ButtonContainers = styled("div")(({ theme }) => ({
	[theme.breakpoints.down("sm")]: {
		display: "none",
	},
}));

interface Props {
	children: JSX.Element;
}

function NavBar({ children }: Props) {
	const [openDrawer, setOpenDrawer] = useState(false);
	const { user } = useContext(UserContext);

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						sx={{ mr: 2, display: { sm: "none" } }}
						onClick={() => setOpenDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						News
					</Typography>

					<ButtonContainers>
						<Button color="inherit">Login</Button>
					</ButtonContainers>
				</Toolbar>
			</AppBar>
			{children}
			<MenuDrawer open={openDrawer} setOpen={setOpenDrawer} />
		</>
	);
}

export default NavBar;
