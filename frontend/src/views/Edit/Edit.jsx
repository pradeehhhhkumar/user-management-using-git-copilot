import { useEffect, useState } from "react";
import { TextField, Button, Box, Paper, Link, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { me, updateUser } from "../../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./edit.css";

const Edit = () => {
  const [isLoading, setIsLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required!"),
      email: Yup.string().email("Invalid email address").required("Required!"),
      address: Yup.string().required("Required!"),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const { id } = useParams();
  const handleFetchUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await me(id);
      console.log(data.data.name);
      formik.setValues({
        name: data.data?.name,
        email: data.data?.email,
        address: data.data?.address,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  const navigate = useNavigate();
  // handleSubmit function for api call
  const handleSubmit = async (values) => {
    try {
      const response = await updateUser(id,values);
      if (response?.status === 200) {
        navigate("/dashboard");
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  // handle form data using formik
  // https://formik.org/docs/tutorial

  return (
    <Box className="editpage">
      {isLoading ? (
        <Typography sx={{ color: "white" }} variant="h4" component="h4">
          Loading....
        </Typography>
      ) : (
        <Paper className="paper" elevation={2}>
          <h2>Edit</h2>
          <form className="form" onSubmit={formik.handleSubmit}>
            <TextField
              id="name"
              label="Name"
              type="name"
              name="name"
              value={formik.values.name}
              autoComplete="name"
              margin="normal"
              variant="outlined"
              onChange={formik.handleChange}
              error={Boolean(formik?.touched?.name && formik?.errors?.name)}
              helperText={formik?.touched?.name && formik?.errors?.name}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              name="email"
              value={formik.values.email}
              disabled
              margin="normal"
              variant="outlined"
              onChange={formik.handleChange}
              error={Boolean(formik?.touched?.email && formik?.errors?.email)}
              helperText={formik?.touched?.email && formik?.errors?.email}
            />
            <TextField
              id="address"
              label="Address"
              type="address"
              name="address"
              autoComplete="address"
              margin="normal"
              value={formik.values.address}
              variant="outlined"
              onChange={formik.handleChange}
              error={Boolean(
                formik?.touched?.address && formik?.errors?.address
              )}
              helperText={formik?.touched?.address && formik?.errors?.address}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="submit"
            >
              Submit
            </Button>
          </form>
        </Paper>
      )}
    </Box>
  );
};
export default Edit;
