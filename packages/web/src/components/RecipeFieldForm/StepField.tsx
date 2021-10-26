import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useTheme, styled } from "@mui/material/styles";

import { FieldsProps } from "./FieldsProps";
import { useFieldArray } from "react-hook-form";

const FieldsContainer = styled("div")`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

function StepField({ control, register }: FieldsProps) {
	const { fields, append, remove } = useFieldArray({ control, name: "steps" });
	const theme = useTheme();
	return (
		<>
			<Typography
				variant="h4"
				sx={{
					color: theme.palette.text.primary,
					marginTop: "1rem",
				}}
			>
				Steps
			</Typography>

			<List>
				{fields.map((step, index) => (
					<ListItem key={step.id}>
						<FieldsContainer>
							<TextField
								type="number"
								label="Number"
								size="small"
								variant="filled"
								inputProps={{ ...register(`steps.${index}.stepNumber`) }}
							/>
							<TextField
								label="Description"
								size="small"
								variant="filled"
								multiline
								maxRows={4}
								inputProps={{ ...register(`steps.${index}.stepDescription`) }}
							/>
						</FieldsContainer>

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

			<Button
				variant="contained"
				onClick={() => append({ stepNumber: fields.length + 1 })}
			>
				Add Step
			</Button>
		</>
	);
}

export default StepField;
