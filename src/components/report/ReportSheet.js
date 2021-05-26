import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./Report.css";
import UniformReport from "./UniformReport";
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

const ReportSheet = ({ company, year, month, monthName }) => {
  const [reporty, setReporty] = useState([]);
  const [grandTotal, setGrandTotal] = useState("");

  const classes = useStyles();
  let i = 1;

  useEffect(() => {
    axios.get(`${URD}/report/${company}/${year}/${month}`).then((response) => {
      setReporty(response.data.unit);
      setGrandTotal(response.data.grandTotal[0].grandTotal);
    });
  }, [company]);

  const getTotal = (rep) =>
    rep.reduce((amount, item) => Number(item.total) + amount, 0);

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
                      <td colSpan="5" className={classes.head}>
                        STORE ITEMS ISSUED OUT TO EACH DIV/UNIT IN {monthName}{" "}
                        {year}
                      </td>
                    </tr>

                    <tr className={classes.tableRowHead}>
                      <th width="6px" className={classes.head}>
                        S/N
                      </th>
                      <th className={classes.head}>ITEM DESCRIPTION</th>
                      <th className={classes.head}>QTY</th>
                      <th className={classes.head}>UNIT PRICE</th>
                      <th className={classes.head}>TOTAL</th>
                    </tr>

                    <tbody>
                      {reporty.map((reporter) => (
                        <>
                          <>
                            <tr>
                              <td colSpan="5">&nbsp;</td>
                            </tr>
                            <tr>
                              <td className={classes.head} colSpan="5">
                                UNIT: {reporter[0].department.dept_name}
                              </td>
                            </tr>
                          </>
                          {reporter.map((reporting) => (
                            <>
                              <tr className={classes.tableRow} key={i}>
                                <td className={classes.data}>{i++}</td>
                                <td className={classes.data}>
                                  {reporting.item.item_name}
                                </td>
                                <td className={classes.data}>
                                  {reporting.quantity}
                                </td>
                                <td className={classes.data}>
                                  &#8358;
                                  {Number(
                                    reporting.total / reporting.quantity
                                  ).toFixed(2)}
                                </td>
                                <td className={classes.data}>
                                  &#8358;
                                  {Number(reporting.total).toFixed(2)}
                                </td>
                              </tr>
                            </>
                          ))}
                          <tr className={classes.tableRow}>
                            <td colSpan="4"></td>
                            <td
                              className={classes.data}
                              style={{ backgroundColor: "#17a2b8" }}
                            >
                              &#8358;{Number(getTotal(reporter)).toFixed(2)}
                            </td>
                          </tr>
                        </>
                      ))}
                      <tr className={classes.tableRow}>
                        <th className={classes.head} colSpan="4">
                          GRAND TOTAL
                        </th>
                        <th
                          className={classes.head}
                          style={{ backgroundColor: "green" }}
                        >
                          &#8358;{Number(grandTotal).toFixed(2)}
                        </th>
                      </tr>
                      <tr>
                        <td colSpan="5">&nbsp;</td>
                      </tr>
                      <tr>
                        <td colSpan="5">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <UniformReport
                    company={company}
                    month={month}
                    year={year}
                    monthName={monthName}
                  />
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

export default ReportSheet;
