import { useState, useContext } from "react";
import { useTheme, styled } from "@mui/material/styles";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import apiRequest from "../../utils/apiRequest";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Container from "@mui/material/Container";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingBackdrop from "../../components/LoadingBackdrop/LoadingBackdrop";
import { UserContext } from "../../contexts/userContext";
import { User } from "../../types/User";
import MyContainer from "../../components/MyContainer/MyContainer";

const FormStyled = styled("form")(({ theme }) => ({
	height: "100%",
	display: "flex",
	alignItems: "center",
	flexDirection: "column",
	marginTop: "-200px",
}));

interface LoginForm {
	email: string;
	password: string;
}

function Login() {
	const [showPassword, setShowPassword] = useState(true);
	const { setUser } = useContext(UserContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>();
	const theme = useTheme();
	const loginMutation = useMutation((login: LoginForm) => {
		return apiRequest({
			url: "authentication/log-in",
			method: "POST",
			data: login,
			withCredentials: true,
		});
	});

	const loginSubmit = async (data: LoginForm) => {
		const result = await loginMutation.mutateAsync({ ...data });
		setUser(result.data as User);
	};

	if (loginMutation.isSuccess) {
		return <Redirect to={{ pathname: "/" }} />;
	}

	return (
		<MyContainer
			maxWidth="xs"
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			{loginMutation.isLoading && (
				<LoadingBackdrop
					sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
					open={true}
				/>
			)}
			<FormStyled onSubmit={handleSubmit(loginSubmit)}>
				<Typography
					variant="h4"
					sx={{ color: theme.palette.text.primary, marginBottom: "1rem" }}
				>
					Login
				</Typography>
				<TextField
					label="Email Adress"
					fullWidth
					sx={{ marginBottom: "1rem" }}
					{...register("email", {
						required: { value: true, message: "Email Adress is required." },
						pattern: {
							value:
								/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: "Is not a valid Email Adress.",
						},
					})}
					error={errors.email ? true : false}
					helperText={errors.email?.message}
				/>
				<TextField
					type={showPassword ? "password" : "text"}
					label="Password"
					fullWidth
					sx={{ marginBottom: "1rem" }}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword((prev) => !prev)}>
									{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
								</IconButton>
							</InputAdornment>
						),
					}}
					{...register("password", {
						required: {
							value: true,
							message: "The password is required.",
						},
						minLength: {
							value: 4,
							message: "The password must be 4 characters long.",
						},
					})}
					error={errors.password ? true : false}
					helperText={errors.password?.message}
				/>

				<Button
					type="submit"
					variant="contained"
					fullWidth
					sx={{ marginBottom: "1rem" }}
				>
					Log In
				</Button>

				<Typography
					variant="body1"
					sx={{
						color: theme.palette.text.primary,
						marginBottom: "1rem",
						alignSelf: "flex-start",
						"& a": {
							color: theme.palette.primary.dark,
						},
					}}
				>
					Don't have a account? <Link to="/sign-up">Sign up</Link>
				</Typography>
			</FormStyled>
		</MyContainer>
	);
}

export default Login;
