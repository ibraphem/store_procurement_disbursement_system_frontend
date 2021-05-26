import React, { useState, useEffect } from "react";
import ErrorAlerts from "../layouts/alerts/ErrorAlerts";
import SuccessAlerts from "../layouts/alerts/SuccessAlerts";
import { CircularProgress, Grid, Paper, Card } from "@material-ui/core";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../../StateProvider";
import PurchaseSearch from "./PurchaseSearch";
import PurchaseSearchList from "./PurchaseSearchList";
import PurchaseList from "./PurchaseList";
import { useParams } from "react-router-dom";
import { URD } from "../layouts/Config";

const PurchaseForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");

  let params = useParams();
  let { company, action } = params;

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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${URD}/item`)
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePurchaseDateChange = (e) => {
    setPurchaseDate(e.target.value);
  };

  const getKeyword = (event) => {
    setSearchWord(event.target.value);
    let keyword = searchWord.toUpperCase();

    if (keyword.length > 1) {
      let filter = items.filter((item) => {
        let itemName = item.item_name.toUpperCase();

        return itemName.indexOf(keyword) > -1;
      });
      setFiltered(filter);
    } else {
      setFiltered(null);
    }
  };

  const resetFilter = () => {
    setSearchWord("");
    setFiltered(null);
  };

  const [
    { purchaseOla, purchaseLo, disburseLo, disburseOla },
    dispatch,
  ] = useStateValue();

  console.log(disburseLo);

  let filt = filtered?.map((v) => ({
    ...v,
    company: company,
  }));

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>
                {action} For {company}
              </h1>
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

              {!isLoading ? (
                <>
                  <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="purchase_date"
                          label={`${action} Date`}
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
                      <Grid item xs={12} sm={6}>
                        <>
                          <PurchaseSearch
                            keyword={getKeyword}
                            filter={filtered}
                            searchWord={searchWord}
                            resetFilter={resetFilter}
                            company={company}
                            action={action}
                          />
                          {filt !== null && filt?.length > 0 ? (
                            <PurchaseSearchList
                              filtered={filt}
                              action={action}
                            />
                          ) : (
                            ""
                          )}
                        </>
                      </Grid>
                    </Grid>
                  </Paper>

                  {action === "Procurement" ? (
                    <PurchaseList
                      selectedItems={
                        company === "Landover" ? purchaseLo : purchaseOla
                      }
                      purchaseDate={purchaseDate}
                      company={company}
                      action={action}
                    />
                  ) : (
                    <PurchaseList
                      selectedItems={
                        company === "Landover" ? disburseLo : disburseOla
                      }
                      purchaseDate={purchaseDate}
                      company={company}
                      action={action}
                      dis={company === "Landover" ? disburseLo : disburseOla}
                    />
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
