import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { Box, Link, Stack, TextField, Typography } from "@mui/material";

import { AppRoutes } from "@config/routes";
import AppButton from "@features/ui/AppButton";
import { useAppDispatch, useAppSelector } from "@store/index";

import { loginUser } from "../store/authActions";
import { selectUser } from "../store/authSlice";

interface FormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { handleSubmit, control, onSubmit } = useLoginForm();
  const user = useAppSelector(selectUser);

  if (user) {
    return <Navigate to={AppRoutes.dashboard} replace />;
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <Controller
        name="email"
        control={control}
        rules={{ required: "Please specify your email address" }}
        render={({ field, fieldState }) => (
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            helperText={fieldState.error?.message}
            error={Boolean(fieldState.error)}
            sx={{ mb: 3, mt: 0 }}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: "Please specify your password" }}
        render={({ field, fieldState }) => (
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={fieldState.error?.message}
            error={Boolean(fieldState.error)}
            sx={{ mb: { xs: 3, md: 5 }, mt: 0 }}
            {...field}
          />
        )}
      />

      <AppButton type="submit" fullWidth sx={{ mb: 2 }}>
        Login
      </AppButton>
      <Stack
        justifyContent="center"
        direction="row"
        spacing={0.5}
        sx={{ width: "100%" }}
      >
        <Typography color="text.secondary">Don't have account yet?</Typography>

        <Link href={AppRoutes.signUp} variant="body2">
          Sign up
        </Link>
      </Stack>
    </Box>
  );
}

function useLoginForm() {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(
      loginUser({
        email: data.email,
        password: data.password,
      }),
    );
  };

  return {
    handleSubmit,
    control,
    onSubmit,
  };
}
