import { useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Redirect } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";
import LoadingBackdrop from "../../components/LoadingBackdrop/LoadingBackdrop";
import MyContainer from "../../components/MyContainer/MyContainer";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface RegisterForm {
	email: string;
	password: string;
	passwordConfirm: string;
	name: string;
}

const FormStyled = styled("form")(() => ({
	height: "100%",
	display: "flex",
	alignItems: "center",
	flexDirection: "column",
	marginTop: "-120px",
}));

function SignUp() {
	const [showPassword, setShowPassword] = useState(true);
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<RegisterForm>();
	const theme = useTheme();
	const signUpMutation = useMutation((register: RegisterForm) =>
		apiRequest({
			url: "authentication/register",
			data: register,
			method: "POST",
			withCredentials: true,
		})
	);

	const registerSubmit = (data: RegisterForm) => {
		signUpMutation.mutateAsync({ ...data });
	};

	if (signUpMutation.isSuccess) {
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
			{signUpMutation.isLoading && (
				<LoadingBackdrop
					sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
					open={true}
				/>
			)}
			<FormStyled onSubmit={handleSubmit(registerSubmit)}>
				<Typography
					variant="h4"
					sx={{ color: theme.palette.text.primary, marginBottom: "1rem" }}
				>
					Register User
				</Typography>
				<TextField
					label="Name"
					fullWidth
					sx={{ marginBottom: "1rem" }}
					{...register("name", {
						required: { value: true, message: "Name is required." },
					})}
					error={errors.name ? true : false}
					helperText={errors.name?.message}
				/>
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

				<TextField
					type={showPassword ? "password" : "text"}
					label="Password Confirm"
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
					{...register("passwordConfirm", {
						required: {
							value: true,
							message: "The password is required.",
						},
						minLength: {
							value: 4,
							message: "The password must be 4 characters long.",
						},
						validate: {
							matchesPreviousPassword: (value: string) => {
								const { password } = getValues();
								return password === value || "Password should match";
							},
						},
					})}
					error={errors.passwordConfirm ? true : false}
					helperText={errors.passwordConfirm?.message}
				/>
				<Button
					type="submit"
					variant="contained"
					fullWidth
					sx={{ marginBottom: "1rem" }}
				>
					Sign Up
				</Button>
			</FormStyled>
		</MyContainer>
	);
}

export default SignUp;
