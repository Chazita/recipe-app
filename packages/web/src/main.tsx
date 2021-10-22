import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseLine from "@mui/material/CssBaseline";
import { QueryClientProvider, QueryClient } from "react-query";
import { DarkModeState } from "./contexts/darkModeContext";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<DarkModeState>
			<QueryClientProvider client={queryClient}>
				<CssBaseLine />
				<App />
			</QueryClientProvider>
		</DarkModeState>
	</React.StrictMode>,
	document.getElementById("root")
);
