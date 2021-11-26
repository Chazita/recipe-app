import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useTheme, styled } from "@mui/material/styles";

import { FieldsProps } from "./FieldsProps";
import { useFieldArray } from "react-hook-form";

function StepField({ control, register, formState: { errors } }: FieldsProps) {
	const { fields, append, remove } = useFieldArray({ control, name: "steps" });
	const theme = useTheme();

	return (
		<Grid container item xs={12}>
			<Grid item xs={12}>
				<Typography
					variant="h4"
					sx={{
						color: theme.palette.text.primary,
						marginTop: "1rem",
					}}
				>
					Steps
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<List>
					{fields.map((step, index) => (
						<ListItem key={step.id}>
							<Grid container item xs={12} direction="column">
								<TextField
									type="number"
									label="Number"
									variant="filled"
									inputProps={{
										...register(`steps.${index}.stepNumber`, {
											required: {
												value: true,
												message: "The number of the step is required.",
											},
										}),
									}}
									error={
										errors.steps && errors.steps[index].stepNumber
											? true
											: false
									}
									helperText={
										errors.steps && errors.steps[index].stepNumber
											? errors.steps[index].stepNumber?.message
											: ""
									}
									fullWidth
								/>

								<TextField
									label="Description"
									variant="filled"
									multiline
									maxRows={4}
									inputProps={{
										...register(`steps.${index}.stepDescription`, {
											required: {
												value: true,
												message: "The description of the step is required.",
											},
											maxLength: {
												value: 500,
												message:
													"The description can't have more than 500 characters.",
											},
										}),
									}}
									error={
										errors.steps && errors.steps[index].stepDescription
											? true
											: false
									}
									helperText={
										errors.steps && errors.steps[index].stepDescription
											? errors.steps[index].stepDescription?.message
											: ""
									}
									fullWidth
								/>
							</Grid>

							<Button
								variant="contained"
								color="error"
								onClick={() => remove(index)}
								sx={{ height: "100%" }}
							>
								Delete
							</Button>
						</ListItem>
					))}
				</List>
			</Grid>

			<Button
				variant="contained"
				onClick={() => append({ stepNumber: fields.length + 1 })}
				fullWidth
			>
				Add Step
			</Button>
		</Grid>
	);
}

export default StepField;
