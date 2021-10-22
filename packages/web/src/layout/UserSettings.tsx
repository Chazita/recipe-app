import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import LogoutIcon from "@mui/icons-material/Logout";

interface Props extends MenuProps {
	handleClose: () => void;
}

function UserSettings({ anchorEl, handleClose, open, ...props }: Props) {
	return (
		<Menu open={open} anchorEl={anchorEl} {...props}>
			<MenuItem onClick={handleClose}>
				<ListItemIcon>
					<LogoutIcon />
				</ListItemIcon>
				<ListItemText>Logout</ListItemText>
			</MenuItem>
		</Menu>
	);
}

export default UserSettings;
