import { useContext } from "react";
import apiRequest from "../utils/apiRequest";
import { UserContext } from "../contexts/userContext";
import { useHistory } from "react-router";

import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import LogoutIcon from "@mui/icons-material/Logout";

interface Props extends MenuProps {
	handleClose: () => void;
}

function UserSettings({ anchorEl, handleClose, open, ...props }: Props) {
	const { setUser } = useContext(UserContext);
	const history = useHistory();

	const logOutHandle = async () => {
		try {
			await apiRequest({
				url: "authentication/log-out",
				method: "POST",
				withCredentials: true,
			});

			setUser(undefined);
			history.push("/");
			handleClose();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Menu open={open} anchorEl={anchorEl} {...props}>
			<MenuItem onClick={() => logOutHandle()}>
				<ListItemIcon>
					<LogoutIcon />
				</ListItemIcon>
				<ListItemText>Logout</ListItemText>
			</MenuItem>
		</Menu>
	);
}

export default UserSettings;
