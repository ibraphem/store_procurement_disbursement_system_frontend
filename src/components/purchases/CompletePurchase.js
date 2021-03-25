import React from "react";
import Button from "@material-ui/core/Button";

const CompletePurchase = ({ completed, action }) => {
  return (
    <Button
      variant="contained"
      style={{
        width: "100%",
        fontWeight: "bolder",
        backgroundColor: "#006633",
        color: "#fff",
      }}
      onClick={completed}
    >
      Complete {action}
    </Button>
  );
};

export default CompletePurchase;
