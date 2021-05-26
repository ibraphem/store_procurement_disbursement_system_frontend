import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./Report.css";
import { URD } from "../layouts/Config";
import moment from "moment";

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
  button: {
    margin: theme.spacing(1),
  },

  tableTitle: {
    textAlign: "center",
    color: "green",
  },
  table: {
    borderSpacing: 0,
    border: "2px solid black",
  },
  tableRow: {
    padding: "0px",
    fontSize: "13px",
    lineHeight: "5px",
    border: "2px solid black",
  },

  tableRowHead: {
    border: "2px solid black",
  },

  divFont: {
    fontSize: "15px",
    fontWeight: 500,
  },
  dtext: {
    textAlign: "center",
  },
  hr: {
    height: "2px",
    backgroundColor: "green",
  },
  data: {
    textAlign: "center",
    color: "black",
  },
  head: {
    textAlign: "center",
    color: "black",
  },
}));

const StoreReport = ({ company, asat }) => {
  const [reporty, setReporty] = useState([]);
  const [grandTotal, setGrandTotal] = useState("");
  const classes = useStyles();

  useEffect(() => {
    axios.get(`${URD}/store/report/${company}/${asat}`).then((response) => {
      console.log(response.data);
      setReporty(response.data.store);
      setGrandTotal(response.data.grandTotal[0].grandTotal);
    });
  }, [company]);

  let i = 0;
  const formatDate = (date) => {
    return moment(date).format("MMM DD YYYY");
  };

  const getTotal = (rep) =>
    rep?.reduce((amount, item) => Number(item.price) + amount, 0);

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className={classes.tableTitle}>
                  <b>
                    {company === "Landover"
                      ? "LANDOVER COMPANY"
                      : "OVERLAND AIRWAYS LIMITED"}
                  </b>
                </h5>
              </div>
              {reporty.length > 0 ? (
                <div className="card-body">
                  <table className="table table-bord table-hover">
                    <tr>
                      <th colSpan="5" className={classes.head}>
                        GENERAL ITEM STOCK BALANCE AS AT{" "}
                        {formatDate(asat).toUpperCase()}
                      </th>
                    </tr>
                    {reporty.map((repo) => (
                      <>
                        <tbody>
                          <>
                            <>
                              <tr className={classes.tableRow}>
                                <th className={classes.head}>
                                  {reporty[i++].name}
                                </th>
                                <th className={classes.head}>QUANTITY</th>
                                <th className={classes.head}>UNIT PRICE</th>
                                <th className={classes.head}>TOTAL</th>
                              </tr>
                            </>
                            {repo.item_purchase.map((reporting) => (
                              <>
                                <tr className={classes.tableRow} key={i}>
                                  <td className={classes.data}>
                                    {reporting.item_name}
                                  </td>
                                  <td className={classes.data}>
                                    {reporting.quantity}
                                  </td>
                                  <td className={classes.data}>
                                    &#8358;
                                    {reporting.quantity > 0
                                      ? Number(
                                          reporting.price / reporting.quantity
                                        ).toFixed(2)
                                      : 0.0}
                                  </td>
                                  <td className={classes.data}>
                                    &#8358;
                                    {Number(reporting.price).toFixed(2)}
                                  </td>
                                </tr>
                              </>
                            ))}
                            <tr className={classes.tableRow}>
                              <td colSpan="3"></td>
                              <td
                                className={classes.data}
                                style={{ backgroundColor: "#17a2b8" }}
                              >
                                &#8358;
                                {Number(getTotal(repo.item_purchase)).toFixed(
                                  2
                                )}
                              </td>
                            </tr>
                            <tr className={classes.tableRowHead}>
                              <td colSpan="4"></td>
                            </tr>
                          </>
                        </tbody>
                      </>
                    ))}
                    <tr className={classes.tableRow}>
                      <th className={classes.head} colSpan="3">
                        GRAND TOTAL
                      </th>
                      <th
                        className={classes.head}
                        style={{ backgroundColor: "green" }}
                      >
                        &#8358;{Number(grandTotal).toFixed(2)}
                      </th>
                    </tr>
                  </table>
                </div>
              ) : (
                <div className="card-header">
                  <p className={classes.tableTitle}>No Record Found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreReport;
