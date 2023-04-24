// Create a dashboard for admin to show user list

import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import "./dashboard.css";
import DataTable from "./DataTable";
import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../services/userService";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteUser = async (id) => {
    try {
      setIsDeleting(true);
      const response = await deleteUser(id);
      if (response?.status === 200) {
        setIsDeleting(false);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleGetAllUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response?.status === 200) setUsers(response?.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUpdateStatus = async (id, data) => {
    try {
      setIsDeleting(true);
      const response = await updateUser(id, data);
      if (response?.status === 200) {
        setIsDeleting(false);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("userId"))
      return navigate("/login");
    else if (!isDeleting) handleGetAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleting]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logout successfully");
  };
  return (
    <Box sx={{ minHeight: "96vh" }}>
      <Box
        sx={{
          width: "96%",
          display: "flex",
          justifyContent: "space-between",
          m: 3,
        }}
      >
        <h1 style={{ color: "#1976d2" }}>Dashboard</h1>
        <Button
          variant="contained"
          color="primary"
          sx={{ height: "50px" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <Box className="dashboard">
        <DataTable
          rows={users}
          handleDeleteUser={handleDeleteUser}
          handleUpdateUser={handleUpdateStatus}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
