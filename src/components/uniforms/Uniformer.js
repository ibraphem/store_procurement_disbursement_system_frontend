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
import { URD } from "../layouts/Config";
import ErrorAlerts from "../layouts/alerts/ErrorAlerts";
import SuccessAlerts from "../layouts/alerts/SuccessAlerts";
import { useParams } from "react-router-dom";
import moment from "moment";

const Uniformer = () => {
  let params = useParams();
  let { company } = params;

  const formatDate = (date) => {
    return moment(date).format("MMM DD YYYY");
  };

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),

    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
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

  const [uniformers, setUniformers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uniforms, setUniforms] = useState([]);
  const [iserror, setIserror] = useState(null);
  const [alertMessage, setAlertMessage] = useState([]);

  const handleRowAdd = (newData, resolve) => {
    let errorList = [];
    if (newData.quantity === undefined || isNaN(newData.quantity)) {
      errorList.push("Quantity must be a valid integer   ");
      setIserror(true);
    }

    if (newData.personnel === undefined) {
      errorList.push("Price cannot be empty  ");
      setIserror(true);
    }

    if (newData.date === undefined || newData.date === null) {
      errorList.push("Date can't be empty   ");
      setIserror(true);
    }

    let date = new Date(newData.date).toISOString().slice(0, 10);

    if (errorList.length < 1) {
      console.log(newData);
      axios
        .post(`${URD}/uniformer/store/${company}/${date}`, newData, {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((response) => {
          if (response.data[0] === 10) {
            resolve();
            setAlertMessage([
              `The uniform quantity you want to issue is ${response.data[1]} unit higher than what is in store `,
            ]);
            setIserror(true);
          } else {
            setUniformers(response.data);
            resolve();
            setAlertMessage(["Record added succesfully "]);
            setIserror(false);
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

  const handleRowUpdate = (newData, oldData, resolve) => {
    let errorList = [];
    if (newData.quantity === undefined || isNaN(newData.quantity)) {
      errorList.push("Quantity must be a valid integer   ");
      setIserror(true);
    }

    if (newData.personnel === undefined) {
      errorList.push("Price cannot be empty  ");
      setIserror(true);
    }

    if (newData.date === undefined || newData.date === null) {
      errorList.push("Date can't be empty   ");
      setIserror(true);
    }

    let date = new Date(newData.date).toISOString().slice(0, 10);

    if (errorList.length < 1) {
      // console.log(newData);
      //no error
      axios
        .post(`${URD}/uniformer/update/${date}/${company}`, newData)
        .then((response) => {
          setUniformers(response.data);
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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${URD}/uniformer/${company}`, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((response) => {
        setUniformers(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsLoading(true);
    axios
      .get(`${URD}/uniforms/${company}`)
      .then((response) => {
        setUniforms(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [company]);

  const uniform = {};
  uniforms.map((uni) => {
    const { id, type } = uni;
    uniform[id] = type;
  });

  const columns = [
    {
      title: "UNIFORM",
      field: "uniform_id",
      lookup: uniform,
      cellStyle: {
        minWidth: 350,
      },
    },
    {
      title: "PERSONNEL",
      field: "personnel",
      cellStyle: {
        minWidth: 300,
      },
    },
    {
      title: "DATE ISSUED",
      field: "date",
      type: "date",
      render: (row) => <span> {formatDate(row["date"])}</span>,
    },

    {
      title: "QUANTITY",
      field: "quantity",
    },
  ];

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>{company} Uniforms</h1>
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
                  data={uniformers}
                  title="Uniform Issuance Table"
                  icons={tableIcons}
                  options={{
                    search: true,
                    sorting: true,
                    headerStyle: {
                      backgroundColor: "#01579b",
                      color: "#FFF",
                    },
                  }}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        handleRowUpdate(newData, oldData, resolve);
                      }),

                    onRowAdd: (newData) =>
                      new Promise((resolve) => {
                        handleRowAdd(newData, resolve);
                      }),
                  }}
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

export default Uniformer;
