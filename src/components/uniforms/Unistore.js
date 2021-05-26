import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
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
import SuccessAlerts from "../layouts/alerts/SuccessAlerts";
import moment from "moment";
import ErrorAlerts from "../layouts/alerts/ErrorAlerts";
import { URD } from "../layouts/Config";

const Unistore = ({ uniform_id }) => {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),

    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => (
      <Edit {...props} ref={ref} style={{ color: "#fff" }} />
    )),
    Delete: forwardRef((props, ref) => (
      <DeleteIcon {...props} ref={ref} style={{ color: "#fff" }} />
    )),
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

  const [unistores, setUnistores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iserror, setIserror] = useState(null);
  const [alertMessage, setAlertMessage] = useState([]);

  const handleRowAdd = (newData, resolve) => {
    let purchase_date = new Date(newData.date).toISOString().slice(0, 10);

    let errorList = [];
    if (newData.date === undefined) {
      errorList.push("Please enter purchase date");
      setIserror(true);
    }

    if (newData.price === undefined || isNaN(newData.price)) {
      errorList.push("Please enter uniform price appropiately");
      setIserror(true);
    }

    if (newData.quantity === undefined || isNaN(newData.quantity)) {
      errorList.push("Please enter purchased quantity appropiately");
      setIserror(true);
    }

    if (errorList.length < 1) {
      //no error
      axios
        .post(`${URD}/unistore/store/${uniform_id}/${purchase_date}`, newData)
        .then((response) => {
          setUnistores(response.data);
          resolve();
          setAlertMessage(["Purchase successful "]);
          setIserror(false);
        })
        .catch((error) => {
          setAlertMessage(["Oops, something went wrong!!!   "]);
          setIserror(true);
          resolve();
        });
    } else {
      setAlertMessage(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    let purchase_date = new Date(newData.date).toISOString().slice(0, 10);

    let errorList = [];
    if (newData.date === undefined) {
      errorList.push("Please enter purchase date");
      setIserror(true);
    }

    if (newData.price === undefined || isNaN(newData.price)) {
      errorList.push("Please enter uniform price appropiately");
      setIserror(true);
    }

    if (newData.quantity === undefined || isNaN(newData.quantity)) {
      errorList.push("Please enter purchased quantity appropiately");
      setIserror(true);
    }

    if (oldData.quantity !== oldData.remainder) {
      errorList.push(
        "You can't update this purchase because one or more of it has been disbursed  "
      );
      setIserror(true);
    }

    if (errorList.length < 1) {
      axios
        .post(
          `${URD}/unistore/update/${oldData.id}/${uniform_id}/${purchase_date}`,
          newData
        )
        .then((response) => {
          setUnistores(response.data);
          resolve();
          setAlertMessage(["Update Successful "]);
          setIserror(false);
        })
        .catch((error) => {
          setAlertMessage(["Oops, something went wrong!!!   "]);
          setIserror(true);
          resolve();
        });
    } else {
      setAlertMessage(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    let errorList = [];
    if (oldData.quantity !== oldData.remainder) {
      errorList.push(
        "You can't delete this purchase because one or more of it has been disbursed  "
      );
      setIserror(true);
    }
    if (errorList.length < 1) {
      axios
        .post(`${URD}/unistore/delete/${oldData.id}/${uniform_id}`)
        .then((response) => {
          setUnistores(response.data);
          resolve();
          setAlertMessage(["Delete Successful "]);
          setIserror(false);
        })
        .catch((error) => {
          setAlertMessage(["Oops, something went wrong!!!   "]);
          setIserror(true);
          resolve();
        });
    } else {
      setAlertMessage(errorList);
      setIserror(true);
      resolve();
    }
  };

  const formatDate = (date) => {
    return moment(date).format("MMM DD YYYY");
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${URD}/unistore/${uniform_id}`)
      .then((response) => {
        setUnistores(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: "PURCHASE DATE",
      field: "date",
      type: "date",
      render: (row) => <span> {formatDate(row["date"])}</span>,
    },
    {
      title: "QUANTITY",
      field: "quantity",
    },

    {
      title: "PRICE",
      field: "price",
      render: (row) => <span>&#8358;{Number(row["price"]).toFixed(2)}</span>,
    },
    {
      title: "TOTAL",
      field: "price",
      editable: "never",
      render: (row) => (
        <span>&#8358;{(row["price"] * row["quantity"]).toFixed(2)}</span>
      ),
    },
  ];

  return (
    <>
      {iserror ? <ErrorAlerts message={alertMessage} /> : null}
      {iserror === false ? <SuccessAlerts message={alertMessage} /> : null}

      <MaterialTable
        columns={columns}
        data={unistores}
        icons={tableIcons}
        style={{
          backgroundColor: "green",
          color: "#fff",
        }}
        options={{
          search: true,
          sorting: false,
          showTitle: false,
          paging: true,
          headerStyle: {
            backgroundColor: "green",
            color: "#FFF",
            fontWeight: "bolder",
          },
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve);
            }),

          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve);
            }),
        }}
      />
    </>
  );
};

export default Unistore;
