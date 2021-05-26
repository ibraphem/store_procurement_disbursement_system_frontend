import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ShowReport from "./ShowReport";
import ShowItemReport from "./ShowItemReport";

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

const ItemReport = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [from, setFrom] = useState("");
  const [action, setAction] = useState("");
  const [to, setTo] = useState("");

  const classes = useStyles();
  let params = useParams();
  let { company, id, item } = params;

  useEffect(() => {
    setShowFilter(true);
  }, [company, id]);

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

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>
                {item.toUpperCase()} REPORT ({company.toUpperCase()})
              </h1>
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
                          options={actions}
                          disableClearable={true}
                          getOptionLabel={(option) => option.action}
                          onChange={(event, value) => {
                            setAction(value.action);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select report"
                              variant="outlined"
                              required={true}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="From"
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
              ) : (
                <ShowItemReport
                  company={company}
                  from={from}
                  to={to}
                  action={action}
                  id={id}
                  item={item}
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

export default ItemReport;

const actions = [
  { id: 1, action: "Procurement" },
  { title: 2, action: "Disbursement" },
];
