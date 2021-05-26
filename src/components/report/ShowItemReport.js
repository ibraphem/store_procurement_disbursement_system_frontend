import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./Report.css";
import moment from "moment";
import { URD } from "../layouts/Config";

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

const ShowItemReport = ({ company, from, to, action, id, item }) => {
  const [reporty, setReporty] = useState([]);
  const [grandTotal, setGrandTotal] = useState("");

  const classes = useStyles();
  let i = 1;

  const formatDate = (date) => {
    return moment(date).format("MMM DD YYYY");
  };

  const getTotal = (rep) =>
    rep.reduce((amount, item) => Number(item.total) + amount, 0);

  useEffect(() => {
    axios
      .get(`${URD}/item/${action}/${id}/${company}/${from}/${to}`)
      .then((response) => {
        if (action === "Procurement") {
          setReporty(response.data.item);
          setGrandTotal(response.data.grandTotal[0].grandTotal);
        } else {
          setReporty(response.data);
        }
      });
  }, [action, id, company, from, to]);

  /* const getTotal = (rep) =>
    rep.reduce((amount, item) => parseInt(item.total) + amount, 0); */

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h6 className={classes.tableTitle}>
                  <b>
                    {company === "Landover"
                      ? `${item.toUpperCase()} ${action.toUpperCase()} REPORT FOR LANDOVER COMPANY LIMITED FROM ${formatDate(
                          from
                        ).toUpperCase()} TO ${formatDate(to)}`
                      : `${item.toUpperCase()} ${action.toUpperCase()} REPORT FOR OVERLAND AIRWAYS LIMITED FROM ${formatDate(
                          from
                        ).toUpperCase()} TO ${formatDate(to)}`}
                  </b>
                </h6>
              </div>
              {reporty.length > 0 ? (
                <div className="card-body">
                  <table className="table table-bord table-hover">
                    <tr className={classes.tableRowHead}>
                      <th width="6px" className={classes.head}>
                        S/N
                      </th>
                      <th className={classes.head}>
                        {action.toUpperCase()} DATE
                      </th>

                      <th className={classes.head}>
                        {action === "Procurement" ? "SUPPLIER" : "DIV/UNITS"}
                      </th>
                      <th className={classes.head}>QUANTITY</th>
                      <th className={classes.head}>UNIT PRICE</th>
                      <th className={classes.head}>TOTAL</th>
                    </tr>

                    <tbody>
                      <>
                        {reporty.map((reporting) => (
                          <>
                            <tr className={classes.tableRow} key={i}>
                              <td className={classes.data}>{i++}</td>
                              <td className={classes.data}>
                                {action === "Procurement"
                                  ? formatDate(reporting.purchase_date)
                                  : formatDate(reporting.disbursement_date)}
                              </td>

                              <td className={classes.data}>
                                {action === "Procurement"
                                  ? reporting.supplier?.supplier_name
                                  : reporting.department?.dept_name}
                              </td>
                              <td className={classes.data}>
                                {action === "Procurement"
                                  ? Number(reporting.supply_qty)
                                  : Number(reporting.quantity)}
                              </td>
                              <td className={classes.data}>
                                &#8358;
                                {action === "Procurement"
                                  ? Number(reporting.purchase_price).toFixed(2)
                                  : Number(
                                      reporting.total / reporting.quantity
                                    ).toFixed(2)}
                              </td>
                              <td className={classes.data}>
                                &#8358;
                                {action === "Procurement"
                                  ? Number(
                                      reporting.purchase_price *
                                        reporting.supply_qty
                                    ).toFixed(2)
                                  : Number(reporting.total).toFixed(2)}
                              </td>
                            </tr>
                          </>
                        ))}
                      </>

                      <tr className={classes.tableRow}>
                        <th className={classes.head} colSpan="5">
                          GRAND TOTAL
                        </th>
                        <th
                          className={classes.head}
                          style={{ backgroundColor: "green" }}
                        >
                          &#8358;
                          {action === "Procurement"
                            ? Number(grandTotal).toFixed(2)
                            : Number(getTotal(reporty)).toFixed(2)}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="card-header">
                  <p className={classes.tableTitle}>No Record Found</p>
                </div>
              )}

              {/* /.card-body */}
            </div>
            {/* /.card */}
            {/* /.card */}
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
      </div>
      {/* /.container-fluid */}
    </section>
  );
};

export default ShowItemReport;
