import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  spotDetailsHandler,
  updateSpotHandler,
} from "../../modules/spots/service";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const EditSpot = () => {
  const userId = localStorage.getItem("userId");
  let { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      images: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
    }),
    enableReinitialize: true, // enable formik to update its values when initialValues prop changes
    onSubmit: (values) => {
      const handleUpdateSpot = async (values) => {
        const response = await updateSpotHandler(values, id);
        if (response.data) {
          navigate("/");
        } else {
          alert("You are not authorized to perfrom this.");
          navigate("/login");
        }
      };
      handleUpdateSpot(values);
    },
  });

  useEffect(() => {
    const handleSpotDetails = async () => {
      const response = await spotDetailsHandler(id);
      if (response.data) {
        if (response.data.user_id != userId) {
          navigate("/");
          alert("You are not authorized to access this");
        }
        formik.setValues({
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
        });
      } else {
        console.log(response.error?.message);
      }
    };
    handleSpotDetails();
  }, []);

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
          Edit a Spot
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="title"
              fullWidth={true}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.errors.title ? renderMessage(formik.errors.title) : ""}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth={true}
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              multiline={true}
              required
            />
            {formik.errors.description
              ? renderMessage(formik.errors.description)
              : ""}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth={true}
              value={formik.values.price}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
            />
            {formik.errors.price ? renderMessage(formik.errors.price) : ""}
          </Grid>
        </Grid>
        <Button
          disabled={!formik.isValid}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Edit a Spot
        </Button>
      </Box>
    </Container>
  );
};
