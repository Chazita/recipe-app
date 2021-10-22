import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import NotesIcon from "@mui/icons-material/Notes";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

interface Routes {
	path: string;
	icon: any;
	text: string;
}

export const routes: Routes[] = [
	{
		path: "/",
		icon: <HomeIcon />,
		text: "Home",
	},
	{
		path: "/recipes-list",
		icon: <NotesIcon />,
		text: "Recipe List",
	},
];

export const notLogIn: Routes[] = [
	{
		path: "/login",
		icon: <PersonIcon />,
		text: "Login",
	},
];

export const isLogIn: Routes[] = [
	{
		path: "/recipe-create",
		icon: <NoteAddIcon />,
		text: "Create Recipe",
	},
];
