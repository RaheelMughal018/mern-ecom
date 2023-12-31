import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyOrders.css";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { clearErrors, myOrders } from "../../Actions/orderAction";
import { Link } from "react-router-dom";
const MyOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch();
  const alert = useAlert();
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        if (params.value === "Processing") {
          return "redColor";
        } else {
          return "greenColor";
        }
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
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
          <Link to={`/orders/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(myOrders());
  }, [error, alert, dispatch]);

  return (
    <>
      <MetaData title={`${user.name}`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10]}
            autoHeight
          />
          <Typography id="myOrdersHeading">{`${user.name}'s Orders`}</Typography>
        </div>
      )}
    </>
  );
};

export default MyOrders;
