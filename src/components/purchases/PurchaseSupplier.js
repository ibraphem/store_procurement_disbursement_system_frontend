import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useStateValue } from "../../StateProvider";
import { URD } from "../layouts/Config";

const PurchaseSupplier = ({ id, company, action, uid, dep }) => {
  const [supplier, setSupplier] = useState([]);

  const [units, setUnits] = useState([]);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${URD}/supplier`)
      .then((response) => {
        if (mounted) {
          setSupplier(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${URD}/department`)
      .then((response) => {
        if (mounted) {
          setUnits(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const [{ purchaseOla, purchaseLo }, dispatch] = useStateValue();

  //  console.log(supplier);

  const updatePurchaseSupplier = (value) => {
    dispatch({
      type: "UPDATE_PURCHASE_SUPPLIER",
      item: {
        id: id,
        supplier: value.id,
        supplier_name: value.supplier_name,
        company: company,
      },
    });
  };

  const updateDisburseUnit = (value) => {
    console.log(value);
    dispatch({
      type: "UPDATE_DISBURSE_UNIT",
      item: {
        id: id,
        uid: uid,
        dept: value.id,
        dept_name: value.dept_name,
        company: company,
      },
    });
  };

  return (
    <Autocomplete
      value={dep}
      size="small"
      disableClearable={true}
      options={action === "Procurement" ? supplier : units}
      getOptionLabel={(option) =>
        action === "Procurement" ? option.supplier_name : option.dept_name
      }
      onChange={
        action === "Procurement"
          ? (event, value) => updatePurchaseSupplier(value)
          : (event, value) => updateDisburseUnit(value)
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={
            action === "Procurement"
              ? "Select Supplier"
              : "Select Station/Dept/Unit"
          }
          style={{
            width: "300px",
            border: "0px",
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
          variant="outlined"
        />
      )}
    />
  );
};

export default PurchaseSupplier;
