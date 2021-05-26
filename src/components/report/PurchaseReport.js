import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ShowReport from "./ShowReport";
import StoreReport from "./StoreReport";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    textAlign: "center",

    height: theme.spacing(11),
  },
}));

const PurchaseReport = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [company, setCompany] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const classes = useStyles();
  let params = useParams();
  let { action } = params;

  useEffect(() => {
    setShowFilter(true);
  }, [action]);

  const print = () => {
    window.print();
  };

  const show_filter = () => {
    setShowFilter(true);
  };

  const fetchReport = (e) => {
    e.preventDefault();
    setShowFilter(false);
  };

  //console.log(action);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>{action} Report</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="#" onClick={show_filter}>
                    {showFilter ? "" : "Show Filter"}
                  </Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link to="#" onClick={print}>
                    {showFilter ? "" : "Print"}
                  </Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">{/* /.card-header */}</div>
              {showFilter ? (
                <Paper className={classes.paper}>
                  <form onSubmit={fetchReport}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={3}>
                        <Autocomplete
                          size="small"
                          options={companies}
                          disableClearable={true}
                          getOptionLabel={(option) => option.company}
                          onChange={(event, value) => {
                            setCompany(value.company);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select company"
                              variant="outlined"
                              required={true}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <TextField
                          label={action === "Store" ? "Date" : "From"}
                          type="date"
                          size="small"
                          variant="outlined"
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(event, value) => {
                            setFrom(event.target.value);
                          }}
                        />
                      </Grid>
                      {action !== "Store" ? (
                        <Grid item xs={12} sm={3}>
                          <TextField
                            label="To"
                            type="date"
                            size="small"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(event, value) => {
                              setTo(event.target.value);
                            }}
                          />
                        </Grid>
                      ) : null}

                      <Grid item xs={12} sm={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          size="large"
                          fullWidth
                        >
                          Fetch
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              ) : action === "Store" ? (
                <StoreReport company={company} asat={from} action={action} />
              ) : (
                <ShowReport
                  company={company}
                  from={from}
                  to={to}
                  action={action}
                />
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

export default PurchaseReport;

const companies = [
  { id: 1, company: "Landover" },
  { title: 2, company: "Overland" },
];
