import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./Report.css";
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

const UniformReport = ({ company, year, month, monthName }) => {
  const [uniform, setUniform] = useState([]);
  const [uniformer, setUniformer] = useState([]);
  const [all, setAll] = useState([]);

  const getTotal = (rep) =>
    rep.reduce((amount, item) => parseInt(item.total) + amount, 0);

  useEffect(() => {
    axios.get(`${URD}/show/${company}/${year}/${month}`).then((response) => {
      setAll(response.data.all);
      setUniform(response.data.uniform);
      setUniformer(response.data.uniformer);
    });
  }, [company]);

  const arr3 = all?.map((t1) => ({
    ...t1,
    ...uniform?.find((t2) => t2.id === t1.id),
  }));

  const arr4 = arr3?.map((t1) => ({
    ...t1,
    ...uniformer?.find((t2) => t2.id === t1.id),
  }));

  let j = 1;
  const classes = useStyles();
  console.log(arr4);

  return (
    <>
      <table className="table table-bord table-hover">
        <tr>
          <td colSpan="6" className={classes.head}>
            UNIFORMS ISSUED TO EACH DIV/UNIT IN {monthName} {year}
          </td>
        </tr>

        <tr className={classes.tableRowHead}>
          <th width="6px" className={classes.head}>
            S/N
          </th>
          <th className={classes.head}>UNIFORM TYPE</th>
          <th className={classes.head}>PRICE</th>
          <th className={classes.head}>QTY</th>
          <th className={classes.head}>TOTAL</th>
          <th className={classes.head}>PERSONNEL</th>
        </tr>

        <tbody>
          {arr4.map((unif) => (
            <>
              <tr className={classes.tableRow} key={j}>
                <td className={classes.data}>{j++}</td>
                <td className={classes.data}>{unif.type}</td>
                <td className={classes.data}>&#8358;{unif.price}</td>
                <td className={classes.data}>
                  {unif.quantity === undefined ? 0 : unif.quantity}
                </td>
                <td className={classes.data}>
                  &#8358;{unif.total === undefined ? 0 : unif.total}
                </td>
                <td className={classes.data}>
                  {unif.uni?.map((person) => (
                    <p>
                      {person.personnel} ({person.quantity})
                    </p>
                  ))}
                </td>
              </tr>
            </>
          ))}
          <tr className={classes.tableRow}>
            <td colSpan="4"></td>
            <td className={classes.data} style={{ backgroundColor: "green" }}>
              &#8358;{parseInt(getTotal(uniform)).toFixed(2)}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UniformReport;
