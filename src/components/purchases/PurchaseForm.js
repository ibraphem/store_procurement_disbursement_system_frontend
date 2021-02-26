import React, { useState, useEffect } from "react";
import ErrorAlerts from "../layouts/alerts/ErrorAlerts";
import SuccessAlerts from "../layouts/alerts/SuccessAlerts";
import { CircularProgress, Grid, Paper, Card } from "@material-ui/core";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../../StateProvider";
import PurchaseSearch from "./PurchaseSearch";
import PurchaseSearchList from "./PurchaseSearchList";
import PurchaseList from "./PurchaseList";

const PurchaseForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [loFiltered, setloFiltered] = useState(null);
  const [olaFiltered, setolaFiltered] = useState(null);
  const [searchWordLo, setSearchWordLo] = useState("");
  const [searchWordOla, setSearchWordOla] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [iserror, setIserror] = useState(null);
  const [alertMessage, setAlertMessage] = useState([]);

  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: theme.spacing(11),
    },

    textField: {
      border: "1px solid white",
    },
  }));
  const classes = useStyles();

  const handlePurchaseDateChange = (e) => {
    setPurchaseDate(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/item")
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getKeywordLo = (event) => {
    setSearchWordLo(event.target.value);
    let keyword = searchWordLo.toUpperCase();
    //console.log(keyword);
    if (keyword.length > 1) {
      let filter = items.filter((item) => {
        let itemName = item.item_name.toUpperCase();
        // console.log(productName);
        return itemName.indexOf(keyword) > -1;
      });
      setloFiltered(filter);
    } else {
      setloFiltered(null);
    }
  };

  const getKeywordOla = (event) => {
    setSearchWordOla(event.target.value);
    let keyword = searchWordOla.toUpperCase();
    //console.log(keyword);
    if (keyword.length > 1) {
      let filter = items.filter((item) => {
        let itemName = item.item_name.toUpperCase();
        // console.log(productName);
        return itemName.indexOf(keyword) > -1;
      });
      setolaFiltered(filter);
    } else {
      setolaFiltered(null);
    }
  };

  const resetFilterLo = () => {
    setSearchWordLo("");
    setloFiltered(null);
  };

  const resetFilterOla = () => {
    setSearchWordOla("");
    setolaFiltered(null);
  };

  const [{ purchase }, dispatch] = useStateValue();

  //  console.log(purchase);

  let filteredLo = loFiltered?.map((v) => ({
    ...v,
    company: "Landover",
  }));

  let filteredOla = olaFiltered?.map((v) => ({
    ...v,
    company: "Overland",
  }));

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Make Purchase</h1>
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
                <>
                  <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="purchase_date"
                          label="Purchase Date"
                          variant="outlined"
                          type="date"
                          size="small"
                          required={true}
                          fullWidth
                          onChange={handlePurchaseDateChange}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <>
                          <PurchaseSearch
                            keyword={getKeywordLo}
                            filter={loFiltered}
                            searchWord={searchWordLo}
                            resetFilter={resetFilterLo}
                            company="Landover"
                          />
                          {loFiltered !== null && loFiltered?.length > 0 ? (
                            <PurchaseSearchList filtered={filteredLo} />
                          ) : (
                            ""
                          )}
                        </>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <>
                          <PurchaseSearch
                            keyword={getKeywordOla}
                            filter={olaFiltered}
                            searchWord={searchWordOla}
                            resetFilter={resetFilterOla}
                            company="Overland"
                          />
                          {olaFiltered !== null && olaFiltered?.length > 0 ? (
                            <PurchaseSearchList filtered={filteredOla} />
                          ) : (
                            ""
                          )}
                        </>
                      </Grid>
                    </Grid>
                  </Paper>

                  {purchase?.length > 0 ? (
                    <PurchaseList selectedItems={purchase} />
                  ) : (
                    ""
                  )}
                </>
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

export default PurchaseForm;
