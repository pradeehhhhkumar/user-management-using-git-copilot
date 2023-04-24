import { Button, IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

function DataTable({ rows, handleDeleteUser, handleUpdateUser }) {
  const navigate = useNavigate();

  const statusButton = (params) => {
    return (
      <IconButton
        aria-label="status"
        onClick={() => {
          console.log("status button clicked", params.id);
          return Swal.fire({
            title: "Are you sure?",
            text: `Do you want to ${
              params.row.status ? "Deactivate" : "Activate"
            } ${params?.row?.name} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: params.row.status ? "Deactivate" : "Activate",
          }).then((result) => {
            if (result.isConfirmed)
              handleUpdateUser(params?.id, { status: !params.row.status });
          });
        }}
      >
        {params.row.status ? (
          <Button variant="contained" color="error">
            Inactive
          </Button>
        ) : (
          <Button variant="contained" color="success">
            Active
          </Button>
        )}
      </IconButton>
    );
  };

  const editButton = (params) => {
    return (
      <IconButton
        aria-label="edit"
        onClick={() => {
          console.log("Edit button clicked", params.row.id);
          navigate(`/edit/${params.id}`);
        }}
      >
        <EditIcon />
      </IconButton>
    );
  };

  const deleteButton = (params) => {
    return (
      <IconButton
        aria-label="delete"
        onClick={() => {
          console.log("delete button clicked", params?.id);
          return Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) handleDeleteUser(params?.id);
          });
        }}
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  const columns = [
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "address", headerName: "Address", width: 550 },
    {
      field: "status",
      headerName: "Status",
      renderCell: statusButton,
      disableClickEventBubbling: true,
      width: 130,
    },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: editButton,
      disableClickEventBubbling: true,
      width: 110,
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: deleteButton,
      disableClickEventBubbling: true,
      width: 110,
    },
  ];
  return (
    <div className="userTable">
      <Paper sx={{ mb: 5 }}>
        <DataGrid
          rows={rows ?? []}
          columns={columns}
          // autoPageSize
          getRowId={(data) => data?._id}
          // pageSize={5}
          // pageSizeOptions={[5]}
        />
      </Paper>
    </div>
  );
}

export default DataTable;
