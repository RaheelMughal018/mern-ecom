import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  delProduct,
} from "../../Actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./SideBar";
import { DELETE_PRODUCT_RESET } from "../../Constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const deleteProductHandler = (id) => {
    dispatch(delProduct(id));
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
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 50,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.row.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <>
      <MetaData title={"All Products - Admin"} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 className="productListHeading">All Products</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10]}
            autoHeight
            className="productListTable"
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
