import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { createSpotHandler } from "../../modules/spots/service";
import { useNavigate } from "react-router-dom";

export const CreateSpot = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { title: "", description: "", price: "", images: [] },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
      images: Yup.array().min(1, "At least one image is required"),
    }),
    onSubmit: (values) => {
      const handleCreateSpot = async (values) => {
        const response = await createSpotHandler(values);
        if (response.data) {
          navigate("/");
        } else {
          alert("You are not authorized to perfrom this.");
          navigate("/login");
        }
      };
      handleCreateSpot(values);
    },
  });

  const handleImagesChange = (event) => {
    const files = event.currentTarget.files;
    formik.setFieldValue("images", [...files]);
  };

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
          Create a Spot
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
          <Grid item xs={12}>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImagesChange}
            />
            {formik.errors.images ? renderMessage(formik.errors.images) : ""}
          </Grid>
        </Grid>
        <Button
          disabled={!formik.isValid}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create a Spot
        </Button>
      </Box>
    </Container>
  );
};
