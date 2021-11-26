import Container, { ContainerProps } from "@mui/material/Container";
import { styled } from "@mui/material/styles";

const ContaierStyled = styled(Container)(({ theme }) => ({
	[theme.breakpoints.up("md")]: {
		minHeight: "calc(100vh - 64px)",
	},
	minHeight: "calc(100vh - 56px)",
}));

function MyContainer({ children, sx, ...props }: ContainerProps) {
	return (
		<ContaierStyled sx={{ ...sx }} {...props}>
			{children}
		</ContaierStyled>
	);
}

export default MyContainer;
