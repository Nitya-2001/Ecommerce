import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; // Import from @mui/x-data-grid
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@mui/material"; // Change import to @mui/material
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit"; // Change import to @mui/icons-material
import DeleteIcon from "@mui/icons-material/Delete"; // Change import to @mui/icons-material
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      console.log(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      //   alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        console.log(params.row.id);
        const productId = params.row.id; // Accessing id from row instead of getValue
        return (
          <Fragment>
            <Link to={`/admin/product/${productId}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteProductHandler(productId)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = products.map((item) => ({
    id: item._id,
    stock: item.Stock,
    price: item.price,
    name: item.name,
  }));

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              autoHeight
              disableSelectionOnClick
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
