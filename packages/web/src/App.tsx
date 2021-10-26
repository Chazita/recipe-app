import { Suspense, useContext, useEffect, useState } from "react";
import Routes from "./routes/Routes";
import { useQuery } from "react-query";
import { UserContext } from "./contexts/userContext";
import { User } from "./types/User";
import { darkModeContext } from "./contexts/darkModeContext";
import { darkTheme, lightTheme } from "./utils/Theme";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import apiRequest from "./utils/apiRequest";

import Box from "@mui/material/Box";
import LoadingBackdrop from "./components/LoadingBackdrop/LoadingBackdrop";

function App() {
	const { darkMode, setDarkMode } = useContext(darkModeContext);
	const [user, setUser] = useState<User>();
	const prefers = useMediaQuery("(prefers-color-scheme: dark)");

	const { isLoading } = useQuery(
		"authentication",
		() =>
			apiRequest<User>({
				url: "authentication",
				method: "GET",
				withCredentials: true,
			}).then((res) => setUser(res.data)),
		{ retry: 0, retryOnMount: false }
	);

	useEffect(() => {
		const mode = localStorage.getItem("theme");
		if (mode) {
			if (mode === "dark") {
				setDarkMode(true);
			} else {
				setDarkMode(false);
			}
		} else {
			setDarkMode(prefers);
		}
	}, [prefers]);

	

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
				{isLoading && <LoadingBackdrop sx={{ color: "#fff" }} open={true} />}
				<Box
					sx={{
						backgroundColor: (theme) => theme.palette.background.default,
					}}
				>
					<Suspense
						fallback={<LoadingBackdrop sx={{ color: "#fff" }} open={true} />}
					>
						{!isLoading && <Routes />}
					</Suspense>
				</Box>
			</ThemeProvider>
		</UserContext.Provider>
	);
}

export default App;
