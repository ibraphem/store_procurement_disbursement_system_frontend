import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import Tooltip from "@material-ui/core/Tooltip";
import { useStateValue } from "../../StateProvider";

const Remove = ({ id, company, action, uid }) => {
  const [{ purchaseLo, purchaseOla }, dispatch] = useStateValue();
  const removePurchase = () => {
    dispatch({
      type: "REMOVE_FROM_PURCHASE",
      item: {
        id: id,
        company: company,
      },
    });
  };

  const removeDisburse = () => {
    console.log(uid);
    dispatch({
      type: "REMOVE_FROM_DISBURSE",
      item: {
        id: id,
        uid: uid,
        company: company,
      },
    });
  };

  return (
    <Tooltip title="Remove from List">
      <IconButton
        edge="end"
        aria-label="remove"
        onClick={action === "Procurement" ? removePurchase : removeDisburse}
      >
        <CancelIcon style={{ color: "#FF0000" }} />
      </IconButton>
    </Tooltip>
  );
};

export default Remove;
