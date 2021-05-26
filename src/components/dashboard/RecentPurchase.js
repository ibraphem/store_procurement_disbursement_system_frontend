import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import AddBox from "@material-ui/icons/AddBox";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { URD } from "../layouts/Config";
import moment from "moment";

const RecentPurchase = () => {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),

    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const formatDate = (date) => {
    return moment(date).format("MMM DD YYYY");
  };

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    axios
      .get(`${URD}/recent`)
      .then((response) => {
        setRecent(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: "ITEM NAME",
      field: "item",
      render: (row) => <span>{row["item"].item_name}</span>,
    },
    {
      title: "PURCHASE DATE",
      field: "purchase_date",
      render: (row) => <span> {formatDate(row["purchase_date"])}</span>,
    },
    {
      title: "SUPPLIER",
      field: "supplier",
      render: (row) => <span>{row["supplier"].supplier_name}</span>,
    },

    {
      title: "QUANTITY",
      field: "supply_qty",
    },

    {
      title: "UNIT PRICE",
      field: "purchase_price",
      render: (row) => <span>&#8358;{row["purchase_price"]}</span>,
    },
    {
      title: "TOTAL",
      field: "purchase_price",
      editable: "never",
      render: (row) => (
        <span>&#8358;{row["purchase_price"] * row["supply_qty"]}</span>
      ),
    },
  ];

  return (
    <MaterialTable
      columns={columns}
      data={recent}
      title="Recent Purchase"
      icons={tableIcons}
      options={{
        search: false,
        sorting: true,
        headerStyle: {
          backgroundColor: "#01579b",
          color: "#FFF",
        },
      }}
    />
  );
};

export default RecentPurchase;
