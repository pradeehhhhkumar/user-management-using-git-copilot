// create a login page using mui
import React from "react";
import "./login.css";
import { TextField, Button, Box, Paper, Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminLogin } from "../../services/adminService";
import { userLogin } from "../../services/userService";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // handleSubmit function for api call
  const handleSubmit = async (values) => {
    localStorage.clear();
    try {
      if (location?.pathname === "/login") {
        const response = await userLogin(values);
        if (response?.status === 200) {
          // success toast message
          localStorage.setItem("token", response?.data?.data?.token);
          localStorage.setItem("userId", response?.data?.data?.user?._id);
          navigate("/");
          toast.success(response?.data?.message);
        }
      } else if (location?.pathname === "/admin/login") {
        const response = await adminLogin(values);
        if (response?.status === 200) {
          localStorage.setItem("token", response?.data?.data?.token);
          navigate("/dashboard");
          toast.success(response?.data?.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // handle form data using formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required!"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required!"),
    }),
    onSubmit: (values) => handleSubmit(values),
  });
  return (
    <Box className="loginpage">
      <Paper className="paper" elevation={2}>
        <h2>Login</h2>
        <form className="form" onSubmit={formik.handleSubmit}>
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
          {/*  link to register page */}
          <Link onClick={() => navigate("/register")}>
            Don't have an account?
          </Link>
          <br />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
