import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { loginHandler } from "../../modules/auth/service";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const handleLoginForm = async (values) => {
        const response = await loginHandler(values);
        if (response.data) {
          dispatch(setUser(response.data));
          navigate("/");
          window.location.reload();
        } else {
          alert("Invalid Username or password.");
        }
      };
      handleLoginForm(values);
    },
  });

  const renderMessage = (message) => {
    return <Typography sx={{ color: "red" }}>{message}</Typography>;
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ m: 5 }}>
          Login
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              fullWidth={true}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.errors.email ? renderMessage(formik.errors.email) : ""}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth={true}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
            />
            {formik.errors.password
              ? renderMessage(formik.errors.password)
              : ""}
          </Grid>
        </Grid>
        <Button
          disabled={!formik.isValid}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};
