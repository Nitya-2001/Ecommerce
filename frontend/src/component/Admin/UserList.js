import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; // Import from @mui/x-data-grid
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material"; // Change import to @mui/material
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit"; // Change import to @mui/icons-material
import DeleteIcon from "@mui/icons-material/Delete"; // Change import to @mui/icons-material
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users"); // Use navigate instead of history.push
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
    {
      field: "role",
      headerName: "Role",
      type: "string",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.role === "admin" ? "greenColor" : "redColor";
      },
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   minWidth: 150,
    //   flex: 0.3,
    //   sortable: false,
    //   renderCell: (params) => (
    //     <Fragment>
    //       <Link to={`/admin/user/${params.row.id}`}>
    //         <EditIcon />
    //       </Link>
    //       <Button onClick={() => deleteUserHandler(params.row.id)}>
    //         <DeleteIcon />
    //       </Button>
    //     </Fragment>
    //   ),
    // },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
