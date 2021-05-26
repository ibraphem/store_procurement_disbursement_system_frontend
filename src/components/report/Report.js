import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";
import ReportSheet from "./ReportSheet";

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

const Report = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [monthName, setMonthName] = useState("");
  const [company, setCompany] = useState("");

  const classes = useStyles();

  useEffect(() => {
    setShowFilter(true);
  }, [company]);

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

  // console.log(reporty);
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Monthly Report</h1>
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
                          id="combo-box-demo"
                          disableClearable={true}
                          size="small"
                          options={companies}
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
                        <Autocomplete
                          id="combo-box-demo"
                          size="small"
                          disableClearable={true}
                          options={months}
                          getOptionLabel={(option) => option.title}
                          onChange={(event, value) => {
                            setMonth(value.value);
                            setMonthName(value.title);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Month"
                              variant="outlined"
                              required={true}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          required={true}
                          label="Year"
                          type="number"
                          fullWidth
                          size="small"
                          value={year}
                          onChange={(event, value) => {
                            setYear(event.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          size="large"
                          fullWidth
                        >
                          Fetch Report
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              ) : (
                <ReportSheet
                  company={company}
                  month={month}
                  year={year}
                  monthName={monthName}
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

export default Report;

const months = [
  { title: "JANUARY", value: 1 },
  { title: "FEBRUARY", value: 2 },
  { title: "MARCH", value: 3 },
  { title: "APRIL", value: 4 },
  { title: "MAY", value: 5 },
  { title: "JUNE", value: 6 },
  { title: "JULY", value: 7 },
  { title: "AUGUST", value: 8 },
  { title: "SEPTEMBER", value: 9 },
  { title: "OCTOBER", value: 10 },
  { title: "NOVEMBER", value: 11 },
  { title: "DECEMBER", value: 12 },
];

const companies = [
  { id: 1, company: "Landover" },
  { title: 2, company: "Overland" },
];
