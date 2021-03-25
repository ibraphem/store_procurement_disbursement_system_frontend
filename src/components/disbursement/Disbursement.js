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
import DisbursedItems from "./DisbursedItems";

const Disbursement = () => {
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

  const [disburses, setDisburses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iserror, setIserror] = useState(null);
  const [alertMessage, setAlertMessage] = useState([]);

  const redirectToDisburseForm = () => {
    history.push(`/form/Disbursement/${company}`);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/disbursement/${company}`)
      .then((response) => {
        setDisburses(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [company]);

  const formatDate = (date) => {
    return moment(date).format("MMM DD YYYY");
  };

  const columns = [
    {
      title: "DISBURSEMENT DATE",
      field: "disbursement_date",
      type: "date",
      render: (row) => <span> {formatDate(row["disbursement_date"])}</span>,
    },
    {
      title: "DISBURSEMENT ID",
      field: "disbursement_id",
      editable: "never",
      render: (row) => <span>DIS - {row["disbursement_id"]}</span>,
    },
  ];

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>{company} Disbursements</h1>
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
                  data={disburses}
                  title="Disbursement table"
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
                          <DisbursedItems
                            disbursement_id={rowData.disbursement_id}
                            company={company}
                            disbursement_date={rowData.disbursement_date}
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
                        redirectToDisburseForm();
                      },
                      isFreeAction: true,
                    },
                  ]}
                />
              ) : (
                <CircularProgress />
              )}
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

export default Disbursement;
