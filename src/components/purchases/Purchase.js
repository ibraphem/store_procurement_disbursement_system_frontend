import React, { forwardRef, useState, useEffect } from "react";
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
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import SuccessAlerts from "../layouts/alerts/SuccessAlerts";
import ErrorAlerts from "../layouts/alerts/ErrorAlerts";
import { useParams } from "react-router-dom";
import moment from "moment";
import PurchaseItems from "./PurchaseItems";

const Purchase = () => {
  const history = useHistory();
  let params = useParams();
  let { company } = params;
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

  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iserror, setIserror] = useState(null);
  const [alertMessage, setAlertMessage] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/procurement/${company}`)
      .then((response) => {
        setPurchases(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [company]);

  const redirectToPurchaseForm = () => {
    history.push(`/form/Procurement/${company}`);
  };

  const formatDate = (date) => {
    return moment(date).format("MMM DD YYYY");
  };

  const columns = [
    {
      title: "PURCHASE DATE",
      field: "purchase_date",
      type: "date",
      render: (row) => <span> {formatDate(row["purchase_date"])}</span>,
    },
    {
      title: "PURCHASE ID",
      field: "purchase_id",
      editable: "never",
      render: (row) => <span>PUR - {row["purchase_id"]}</span>,
    },
  ];

  const handleRowUpdate = (newData, oldData, resolve) => {
    let procurement_date = new Date(newData.purchase_date)
      .toISOString()
      .slice(0, 10);

    console.log(newData.purchase_date);
    let errorList = [];
    if (newData.purchase_date === "" || newData.purchase_date === null) {
      errorList.push("Purchase date can't be empty   ");
      setIserror(true);
    }

    if (errorList.length < 1) {
      axios
        .post(
          `http://127.0.0.1:8000/api/procurementDate/update/${oldData.purchase_id}/${company}/${procurement_date}`
        )
        .then((response) => {
          if (response.data === 59) {
            setAlertMessage([
              `OOPs, a purchase has already been made on this day for ${company}. You may edit to this purchase`,
            ]);
            setIserror(true);
            resolve();
          } else {
            setPurchases(response.data);
            setAlertMessage(["Purchase Date Updated Successfully  "]);
            setIserror(false);
            resolve();
          }
        })
        .catch((error) => {
          console.log(error);
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

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>{company} Purchases</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">{/* /.card-header */}</div>

              {iserror ? <ErrorAlerts message={alertMessage} /> : null}
              {iserror === false ? (
                <SuccessAlerts message={alertMessage} />
              ) : null}

              {!isLoading ? (
                <MaterialTable
                  columns={columns}
                  data={purchases}
                  title="Purchase table"
                  icons={tableIcons}
                  options={{
                    search: true,
                    sorting: true,
                    headerStyle: {
                      backgroundColor: "#01579b",
                      color: "#FFF",
                    },
                  }}
                  detailPanel={[
                    {
                      tooltip: "Show Participants",
                      render: (rowData) => {
                        return (
                          <PurchaseItems
                            purchase_id={rowData.purchase_id}
                            company={company}
                            purchase_date={rowData.purchase_date}
                          />
                        );
                      },
                    },
                  ]}
                  actions={[
                    {
                      icon: () => <AddIcon />,
                      tooltip: "Add",
                      onClick: (event, rowData) => {
                        redirectToPurchaseForm();
                      },
                      isFreeAction: true,
                    },
                  ]}
                />
              ) : (
                <CircularProgress />
              )}

              {/* /.card-body */}

              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default Purchase;
