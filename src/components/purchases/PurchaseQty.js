import React, { useState } from "react";
import { useStateValue } from "../../StateProvider";

const PurchaseQty = ({ qty, company, id, action, uid }) => {
  const [quantity, setQuantity] = useState(qty);
  const [{ purchaseOla, purchaseLo }, dispatch] = useStateValue();

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

  const updateDisburseQuantity = (e) => {
    setQuantity(e.target.value);
    dispatch({
      type: "UPDATE_DISBURSE_QUANTITY",
      item: {
        id: id,
        uid: uid,
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
        value={qty}
        onChange={
          action === "Procurement"
            ? updatePurchaseQuantity
            : updateDisburseQuantity
        }
      />
    </div>
  );
};

export default PurchaseQty;
