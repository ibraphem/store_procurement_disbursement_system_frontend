import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useStateValue } from "../../StateProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    zIndex: 1,
    position: "relative",
    overflow: "auto",
    maxHeight: 120,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  ListItemText: {
    color: "#000",
  },
}));

const PurchaseSearchList = ({ filtered, action }) => {
  const classes = useStyles();
  const [
    { purchaseOla, purchaseLo, disburseLo, disburseOla },
    dispatch,
  ] = useStateValue();
  const [uid, setUid] = useState(1);

  //  console.log(filtered);

  const checkPurchaseList = (id, company) => {
    if (company === "Landover") {
      return purchaseLo.findIndex(
        (item) => item.id === id && item.company === company
      );
    } else {
      return purchaseOla.findIndex(
        (item) => item.id === id && item.company === company
      );
    }
  };

  // console.log(checkPurchaseList(4, "Landover"));

  const addToPurchase = (item) => {
    dispatch({
      type: "ADD_TO_PURCHASE",
      item: {
        id: item.id,
        item_name: item.item_name,
        company: item.company,
        price: 0,
        quantity: 1,
        supplier: 1,
        supplier_name: "OPEN MARKET",
      },
    });
  };

  const addToDisburse = (item) => {
    setUid((prevUid) => prevUid + 1);
    // console.log(Math.random().toString(36).replace("0.", ""));

    dispatch({
      type: "ADD_TO_DISBURSE",
      item: {
        uid: Math.random().toString(36).replace("0.", ""),
        id: item.id,
        item_name: item.item_name,
        company: item.company,
        dept: 1,
        dept_name: "GENERAL PROCURMENT",
        quantity: 1,
      },
    });
    //   console.log(dispatch);
  };

  console.log(uid);
  return (
    <List className={classes.root}>
      {filtered.map((item) => (
        <ListItem key={item.id} dense button>
          <ListItemText>
            {action === "Procurement" ? (
              <span
                style={
                  checkPurchaseList(item.id, item.company) === -1
                    ? { color: "#000", fontWeight: "bold" }
                    : { color: "#ccc", fontWeight: "normal" }
                }
              >
                {item.item_name}
              </span>
            ) : (
              <span style={{ color: "#000", fontWeight: "bold" }}>
                {item.item_name}
              </span>
            )}
          </ListItemText>
          <ListItemSecondaryAction>
            {action === "Procurement" ? (
              <>
                <IconButton
                  edge="end"
                  onClick={() => addToPurchase(item)}
                  aria-label="add"
                  disabled={
                    checkPurchaseList(item.id, item.company) === -1
                      ? false
                      : true
                  }
                >
                  <AddShoppingCartIcon
                    style={
                      checkPurchaseList(item.id, item.company) === -1
                        ? { color: "#000", fontWeight: "bold" }
                        : { color: "#ccc", fontWeight: "normal" }
                    }
                  />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  edge="end"
                  onClick={() => addToDisburse(item)}
                  aria-label="add"
                >
                  <AddShoppingCartIcon
                    style={{ color: "#000", fontWeight: "bold" }}
                  />
                </IconButton>
              </>
            )}
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default PurchaseSearchList;
