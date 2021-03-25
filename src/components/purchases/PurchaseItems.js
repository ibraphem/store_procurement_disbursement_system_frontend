import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
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
import AddIcon from "@material-ui/icons/Add";
import ErrorAlerts from "../layouts/alerts/ErrorAlerts";
import SuccessAlerts from "../layouts/alerts/SuccessAlerts";

const PurchaseItems = ({ purchase_id, company, purchase_date }) => {
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
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

  const checkItem = (item_id) => {
    var isPresent = purchaseItems.some(function (item) {
      return item.item_id === item_id;
    });

    return isPresent;
  };

  //  console.log(checkItem(4));

  const handleRowAdd = (newData, resolve) => {
    let isPresent = purchaseItems.some(function (item) {
      return parseInt(item.item_id) === parseInt(newData.item_id);
    });

    let errorList = [];
    if (newData.supply_qty === "" || isNaN(newData.supply_qty)) {
      errorList.push("Quantity must be a valid integer   ");
      setIserror(true);
    }

    if (isPresent) {
      errorList.push(
        "This item is already in this puchase. You may edit quantity  "
      );
      setIserror(true);
    }

    if (newData.purchase_price === "") {
      errorList.push("Price must be a valid integer  ");
      setIserror(true);
    }

    if (errorList.length < 1) {
      // console.log(newData);
      //no error
      axios
        .post(
          `http://127.0.0.1:8000/api/purchaseItem/add/${purchase_id}/${company}/${purchase_date}`,
          newData
        )
        .then((response) => {
          setPurchaseItems(response.data);
          resolve();
          setAlertMessage(["Item added succesfully "]);
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
    let isPresent = purchaseItems.some(function (item) {
      return parseInt(item.item_id) === parseInt(newData.item_id);
    });

    // console.log(isPresent);

    let errorList = [];
    if (newData.supply_qty === "" || isNaN(newData.supply_qty)) {
      errorList.push("Quantity must be a valid integer   ");
      setIserror(true);
    }

    if (isPresent && newData.item_id !== oldData.item_id) {
      errorList.push(
        "This item is already in this puchase. You may edit quantity  "
      );
      setIserror(true);
    }

    if (newData.purchase_price === "") {
      errorList.push("Price must be a valid integer  ");
      setIserror(true);
    }

    if (oldData.supply_qty !== oldData.remainder) {
      errorList.push(
        "You can't update this item because one or more of it has been disbursed  "
      );
      setIserror(true);
    }
    //  console.log(errorList);
    if (errorList.length < 1) {
      // console.log(newData);
      //no error
      axios
        .post("http://127.0.0.1:8000/api/purchaseItem/edit", newData)
        .then((response) => {
          setPurchaseItems(response.data);
          resolve();
          setAlertMessage(["Update Successfull "]);
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
    if (oldData.supply_qty !== oldData.remainder) {
      errorList.push(
        "You can't update this item because one or more of it has been disbursed  "
      );
      setIserror(true);
    }
    if (errorList.length < 1) {
      // console.log(newData);
      //no error
      axios
        .post("http://127.0.0.1:8000/api/purchaseItem/delete", oldData)
        .then((response) => {
          setPurchaseItems(response.data);
          resolve();
          setAlertMessage(["Item Deleted Successfully "]);
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

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    // console.log(purchase_id);
    axios
      .get(`http://127.0.0.1:8000/api/purchase/${purchase_id}`)
      .then((response) => {
        if (mounted) {
          setPurchaseItems(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/item")
      .then((response) => {
        if (mounted) {
          setAllItems(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/supplier")
      .then((response) => {
        if (mounted) {
          setAllSuppliers(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      mounted = false;
    };
  }, []);
  // console.log(allSuppliers);
  const items = {};
  allItems.map((allItem) => {
    const { id, item_name } = allItem;
    items[id] = item_name;
  });

  const suppliers = {};
  allSuppliers.map((allSupplier) => {
    const { id, supplier_name } = allSupplier;
    suppliers[id] = supplier_name;
  });

  const columns = [
    {
      title: "ITEM NAME",
      field: "item_id",
      lookup: items,
    },
    {
      title: "QUANTITY",
      field: "supply_qty",
    },

    {
      title: "PRICE",
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
    {
      title: "SUPPLIER",
      field: "supplier_id",
      lookup: suppliers,
    },
  ];

  // console.log(purchaseItems);
  return (
    <>
      {iserror ? <ErrorAlerts message={alertMessage} /> : null}
      {iserror === false ? <SuccessAlerts message={alertMessage} /> : null}

      <MaterialTable
        columns={columns}
        data={purchaseItems}
        icons={tableIcons}
        style={{
          backgroundColor: "green",
          color: "#fff",
        }}
        options={{
          search: false,
          sorting: false,
          showTitle: false,
          paging: false,
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

export default PurchaseItems;
