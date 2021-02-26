import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import "../layouts/css/Table.css";
import { makeStyles } from "@material-ui/core/styles";
import PurchaseQty from "./PurchaseQty";
import PurchaseSupplier from "./PurchaseSupplier";
import PurchasePrice from "./PurchasePrice";
import { getPurchaseTotal } from "../../Reducer";
import CompletePurchase from "./CompletePurchase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormLabel-root": {
      color: "#fff", // or black
    },
  },
}));

const PurchaseList = ({ selectedItems }) => {
  const [supplier, setSupplier] = useState([]);
  const [selectSuppier, setSelectSuppier] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const classes = useStyles();

  const [{ purchase }, dispatch] = useStateValue();

  //console.log(getPurchaseTotal(purchase));

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/supplier")
      .then((response) => {
        setSupplier(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangePrice = (e) => {
    // setPrice(e.target.value);
    //   console.log(e.target.value);
  };

  const updatePurchaseQuantity = (purchaseItem) => {
    console.log(purchaseItem);
  };

  return (
    <div className="card" style={{ backgroundColor: "#000" }}>
      <div className="card-body">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Item</th>
              <th>Company</th>
              <th>Supplier</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems?.map((item, index) => (
              <tr key={index}>
                <td>{item.item_name}</td>
                <td>
                  {item.company === "Landover" ? (
                    <span className="badge bg-success">{item.company}</span>
                  ) : (
                    <span className="badge bg-danger">{item.company}</span>
                  )}
                </td>
                <td>
                  {" "}
                  <PurchaseSupplier company={item.company} id={item.id} />
                </td>
                <td>
                  {" "}
                  <PurchaseQty
                    qty={item.quantity}
                    company={item.company}
                    id={item.id}
                  />
                </td>
                <td>
                  <PurchasePrice
                    pri={item.price}
                    company={item.company}
                    id={item.id}
                  />
                </td>

                <td>&#8358;{parseInt(item.quantity) * parseInt(item.price)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="4">&nbsp;</td>
              <td colSpan="2">
                <h5>
                  Total: &nbsp; &nbsp; &nbsp; &nbsp; &#8358;
                  {getPurchaseTotal(purchase)}
                </h5>
              </td>
            </tr>
            <tr>
              <td colSpan="4">&nbsp;</td>
              <td colSpan="2">
                <CompletePurchase />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseList;
