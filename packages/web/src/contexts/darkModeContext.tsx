import { createContext, useReducer } from "react";

interface ContextThemeType {
	darkMode: boolean;
	setDarkMode: (bool: boolean) => Promise<void>;
}

interface Action {
	type: string;
	payload: boolean;
}

interface State {
	darkMode: boolean;
}

const SET_THEME = "SET_THEME";

export const darkModeContext = createContext<ContextThemeType>({
	darkMode: false,
	setDarkMode: (bool: boolean) => Promise.resolve(),
});

export const darkModeReducer = (state: State, action: Action) => {
	switch (action.type) {
		case SET_THEME:
			return { ...state, darkMode: action.payload };
		default:
			return state;
	}
};

export const DarkModeState = (props: any) => {
	const initialState: State = {
		darkMode: false,
	};

	const [state, dispatch] = useReducer(darkModeReducer, initialState);

	const setDarkMode = async (bool: boolean) => {
		dispatch({
			type: SET_THEME,
			payload: bool,
		});
	};

	return (
		<darkModeContext.Provider value={{ darkMode: state.darkMode, setDarkMode }}>
			{props.children}
		</darkModeContext.Provider>
	);
};
