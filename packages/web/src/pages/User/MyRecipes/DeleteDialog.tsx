import React from "react";
import { Recipe } from "../../../types/Recipe";
import apiRequest from "../../../utils/apiRequest";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

type Props = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	recipe: Recipe;
	deleteRecipe: (id: number) => void;
};

function DeleteDialog({ open, setOpen, recipe, deleteRecipe }: Props) {
	const closeDialog = () => {
		setOpen(false);
	};

	const deleteAccepted = () => {
		deleteRecipe(recipe.id);
		apiRequest({
			method: "DELETE",
			url: `recipe/${recipe.id}`,
			withCredentials: true,
		});
		closeDialog();
	};

	return (
		<Dialog open={open} onClose={closeDialog}>
			<DialogTitle>Are you sure you wanna delete {recipe.name}?</DialogTitle>
			<DialogContent>
				<DialogContentText color="text.error">
					One you delete this recipe you won't be able to recover it.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog}>Close</Button>
				<Button color="error" onClick={deleteAccepted}>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default DeleteDialog;
