import React from "react";
import "./register.css";
import { TextField, Button, Box, Paper, Link } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  // handleSubmit function for api call
  const handleSubmit = async (values) => {
    try {
      delete values.confirmpassword;
      const response = await addUser(values);
      if (response?.status === 200) {
        navigate("/login");
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  // handle form data using formik
  // https://formik.org/docs/tutorial
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required!"),
      email: Yup.string().email("Invalid email address").required("Required!"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required!"),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required!"),
      address: Yup.string().required("Required!"),
    }),
    onSubmit: (values) => handleSubmit(values),
  });
  return (
    <Box className="registerpage">
      <Paper className="paper" elevation={2}>
        <h2>Register</h2>
        <form className="form" onSubmit={formik.handleSubmit}>
          <TextField
            id="name"
            label="Name"
            type="name"
            name="name"
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
            autoComplete="email"
            margin="normal"
            variant="outlined"
            onChange={formik.handleChange}
            error={Boolean(formik?.touched?.email && formik?.errors?.email)}
            helperText={formik?.touched?.email && formik?.errors?.email}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            onChange={formik.handleChange}
            error={Boolean(
              formik?.touched?.password && formik?.errors?.password
            )}
            helperText={formik?.touched?.password && formik?.errors?.password}
          />
          {/* Confirm password */}
          <TextField
            id="confirmpassword"
            label="Confirm Password"
            type="password"
            name="confirmpassword"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            onChange={formik.handleChange}
            error={Boolean(
              formik?.touched?.confirmpassword &&
                formik?.errors?.confirmpassword
            )}
            helperText={
              formik?.touched?.confirmpassword &&
              formik?.errors?.confirmpassword
            }
          />
          <TextField
            id="address"
            label="Address"
            type="address"
            name="address"
            autoComplete="address"
            margin="normal"
            variant="outlined"
            minRows={1}
            maxRows={3}
            multiline
            onChange={formik.handleChange}
            error={Boolean(formik?.touched?.address && formik?.errors?.address)}
            helperText={formik?.touched?.address && formik?.errors?.address}
          />
          {/* make link for login page */}
          <Link onClick={() => navigate("/login")}>
            Already have an account?
          </Link>
          <br />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
export default Register;
