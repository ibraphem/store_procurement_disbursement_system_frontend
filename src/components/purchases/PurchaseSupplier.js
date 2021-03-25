import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useStateValue } from "../../StateProvider";

const PurchaseSupplier = ({ id, company, action, uid }) => {
  const [supplier, setSupplier] = useState([]);
  const [selectSupplier, setSelectSupplier] = useState("");
  const [units, setUnits] = useState([]);

  useEffect(() => {
    let mounted = true;
    axios
      .get("http://127.0.0.1:8000/api/supplier")
      .then((response) => {
        if (mounted) {
          setSupplier(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://127.0.0.1:8000/api/department")
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
    if (value.id !== null) {
      setSelectSupplier(value.id);
    } else {
      setSelectSupplier("1");
    }

    dispatch({
      type: "UPDATE_PURCHASE_SUPPLIER",
      item: {
        id: id,
        supplier: value.id,
        company: company,
      },
    });
  };

  const updateDisburseUnit = (value) => {
    if (value.id !== null) {
      setSelectSupplier(value.id);
    } else {
      setSelectSupplier("1");
    }

    dispatch({
      type: "UPDATE_DISBURSE_UNIT",
      item: {
        id: id,
        uid: uid,
        dept: value.id,
        company: company,
      },
    });
  };

  //console.log(purchase);

  return (
    <Autocomplete
      id="combo-box-demo"
      size="small"
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
