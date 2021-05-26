import React from "react";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

const CompletePurchase = ({ completed, action, isCompleting }) => {
  return (
    <Button
      variant="contained"
      disabled={isCompleting ? true : false}
      style={{
        width: "100%",
        fontWeight: "bolder",
        backgroundColor: "#006633",
        color: "#fff",
      }}
      onClick={completed}
    >
      {isCompleting ? (
        <CircularProgress style={{ color: "#fff" }} />
      ) : (
        `Complete ${action}`
      )}
    </Button>
  );
};

export default CompletePurchase;
