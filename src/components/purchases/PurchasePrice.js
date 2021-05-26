import React, { useState } from "react";
import { useStateValue } from "../../StateProvider";

const PurchasePrice = ({ pri, company, id }) => {
  const [price, setPrice] = useState(pri);
  const [{ purchaseOla, purchaseLo }, dispatch] = useStateValue();

  const updatePurchasePrice = (e) => {
    setPrice(e.target.value);
    dispatch({
      type: "UPDATE_PURCHASE_PRICE",
      item: {
        id: id,
        price: e.target.value,
        company: company,
      },
    });
  };

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">&#8358;</span>
      </div>
      <input
        type="number"
        className="form-control"
        placeholder="Price"
        onChange={updatePurchasePrice}
        value={pri}
        style={{ width: "70px" }}
      />
    </div>
  );
};

export default PurchasePrice;
