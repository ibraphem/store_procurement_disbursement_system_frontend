import React, { useState, useEffect, forwardRef } from "react";
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
import moment from "moment";
import Filter from "./Filter";
import { URD } from "../layouts/Config";

const DepartmentItems = ({ id, name }) => {
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

  const [items, setItems] = useState([]);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");

  const fetchItems = () => {
    axios
      .get(`${URD}/department/items/${id}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const getTo = (e) => {
    setTo(e.target.value);
  };

  const getFrom = (e) => {
    setFrom(e.target.value);
  };

  const filter = (e) => {
    e.preventDefault();
    axios
      .get(`${URD}/department/items/${id}/${from}/${to}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reset = () => {
    setTo("");
    setFrom("");
    fetchItems();
  };

  const formatDate = (date) => {
    return moment(date).format("MMM DD YYYY");
  };

  const columns = [
    {
      title: "ITEM NAME",
      field: "item",
      render: (row) => <span>{row["item"].item_name}</span>,
    },
    {
      title: "DISBURSEMENT DATE",
      field: "disbursement_date",
      render: (row) => <span>{formatDate(row["disbursement_date"])}</span>,
    },
    {
      title: "DISBURSEMENT ID",
      field: "disbursement_id",
      render: (row) => <span>DIS - {row["disbursement_id"]}</span>,
    },
    {
      title: "QUANTITY",
      field: "quantity",
    },
  ];

  return (
    <>
      <Filter
        getTo={getTo}
        getFrom={getFrom}
        filter={filter}
        reset={reset}
        to={to}
        from={from}
      />
      <MaterialTable
        columns={columns}
        data={items}
        icons={tableIcons}
        title={`${name} Consumptions`}
        style={{
          backgroundColor: "green",
          color: "#fff",
        }}
        options={{
          search: false,
          sorting: false,
          showTitle: true,
          toolbar: true,
          paging: true,
          headerStyle: {
            backgroundColor: "green",
            color: "#FFF",
            fontWeight: "bolder",
          },
        }}
      />
    </>
  );
};

export default DepartmentItems;
