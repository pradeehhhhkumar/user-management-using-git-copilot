// Home page for logged in user
import React, { useEffect, useState } from "react";
import "./home.css";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { me } from "../../services/userService";
import { toast } from "react-toastify";
const Home = () => {
  const userId = localStorage.getItem("userId");
  const [name, setName] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logout successfully");
  };

  useEffect(() => {
    if (!localStorage.getItem("token") || !userId) return navigate("/login");
    me(userId)
      .then((res) => setName(res?.data?.data?.name))
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box className="homepage">
      {Boolean(localStorage.getItem("token") && userId) && (
        <>
          {name && <h2 style={{ fontSize: "50px" }}>Welcome, {name}</h2>}
          <Button
            variant="contained"
            color="primary"
            sx={{ height: "50px" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      )}
    </Box>
  );
};

export default Home;
