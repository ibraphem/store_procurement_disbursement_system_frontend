import React, { useState } from "react";
import { useStateValue } from "../../StateProvider";

const PurchaseQty = ({ qty, company, id }) => {
  const [quantity, setQuantity] = useState(qty);
  const [{ purchase }, dispatch] = useStateValue();

  const updatePurchaseQuantity = (e) => {
    setQuantity(e.target.value);
    dispatch({
      type: "UPDATE_PURCHASE_QUANTITY",
      item: {
        id: id,
        quantity: e.target.value,
        company: company,
      },
    });
  };

  // console.log(purchase);

  return (
    <div className="form-group">
      <input
        type="number"
        className="form-control"
        placeholder="Quantity"
        value={quantity}
        onChange={updatePurchaseQuantity}
        style={{ width: "100px" }}
      />
    </div>
  );
};

export default PurchaseQty;
