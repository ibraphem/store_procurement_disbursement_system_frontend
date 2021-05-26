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
import DeleteIcon from "@material-ui/icons/Delete";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { URD } from "../layouts/Config";

const DisbursedItems = ({ disbursement_id }) => {
  const [disburseItems, setDisburseItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iserror, setIserror] = useState(null);
  const [alertMessage, setAlertMessage] = useState([]);

  const tableIcons = {
    Add: forwardRef((props, ref) => (
      <AddBox {...props} ref={ref} style={{ color: "#fff" }} />
    )),
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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${URD}/disbursed/${disbursement_id}`)
      .then((response) => {
        setDisburseItems(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRowDelete = (oldData, resolve) => {
    //  console.log(oldData.item_id);

    axios
      .post(
        `${URD}/disbursedItem/delete/${disbursement_id}/${oldData.item_id}/${oldData.department_id}`
      )
      .then((response) => {
        setDisburseItems(response.data);
        resolve();
        setAlertMessage(["Deleted Successfully "]);
        setIserror(false);
      })
      .catch((error) => {
        setAlertMessage(["Oops, something went wrong!!!   "]);
        setIserror(true);
        resolve();
      });
  };

  const columns = [
    {
      title: "ITEM NAME",
      field: "item_name",
    },
    {
      title: "STATION/UNIT/DEPARTMENT",
      field: "dept_name",
    },
    {
      title: "QUANTITY",
      field: "quantity",
    },
  ];

  return (
    <MaterialTable
      columns={columns}
      data={disburseItems}
      icons={tableIcons}
      style={{
        backgroundColor: "red",
        color: "#fff",
      }}
      options={{
        search: true,
        sorting: false,
        showTitle: false,
        //   toolbar: true,
        paging: true,
        headerStyle: {
          backgroundColor: "red",
          color: "#FFF",
          fontWeight: "bolder",
        },
      }}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            handleRowDelete(oldData, resolve);
          }),
      }}
    />
  );
};

export default DisbursedItems;
