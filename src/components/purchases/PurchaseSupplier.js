import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useStateValue } from "../../StateProvider";

const PurchaseSupplier = ({ id, company }) => {
  const [supplier, setSupplier] = useState([]);
  const [selectSupplier, setSelectSupplier] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/supplier")
      .then((response) => {
        setSupplier(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [{ purchase }, dispatch] = useStateValue();

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

  console.log(purchase);

  return (
    <Autocomplete
      id="combo-box-demo"
      size="small"
      options={supplier}
      getOptionLabel={(option) => option.supplier_name}
      onChange={(event, value) => updatePurchaseSupplier(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select Supplier"
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
