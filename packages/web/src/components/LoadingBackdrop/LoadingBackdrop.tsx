import Backdrop, { BackdropProps } from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingBackdrop({ ...props }: BackdropProps) {
	return (
		<Backdrop {...props}>
			<CircularProgress />
		</Backdrop>
	);
}

export default LoadingBackdrop;
