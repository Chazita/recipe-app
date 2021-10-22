import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { darkModeContext } from "../contexts/darkModeContext";
import IconButton from "@mui/material/IconButton";

import Brightness5 from "@mui/icons-material/Brightness5";
import Brightness4 from "@mui/icons-material/Brightness4";

function ModeSwitch() {
	const theme = useTheme();
	const { darkMode, setDarkMode } = useContext(darkModeContext);

	const changeMode = () => {
		if (darkMode) {
			localStorage.setItem("theme", "light");
			setDarkMode(false);
		} else {
			localStorage.setItem("theme", "dark");
			setDarkMode(true);
		}
	};

	return (
		<IconButton onClick={changeMode}>
			{theme.palette.mode === "dark" ? <Brightness4 /> : <Brightness5 />}
		</IconButton>
	);
}
export default ModeSwitch;
