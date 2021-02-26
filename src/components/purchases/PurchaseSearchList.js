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

const PurchaseSearchList = ({ filtered }) => {
  const classes = useStyles();
  const [{ purchase }, dispatch] = useStateValue();

  //  console.log(filtered);

  const checkPurchaseList = (id, company) => {
    return purchase.findIndex(
      (item) => item.id === id && item.company === company
    );
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
        supplier: "",
      },
    });
    //   console.log(dispatch);
  };

  return (
    <List className={classes.root}>
      {filtered.map((item) => (
        <ListItem key={item.id} dense button>
          <ListItemText>
            <span
              style={
                checkPurchaseList(item.id, item.company) === -1
                  ? { color: "#000", fontWeight: "bold" }
                  : { color: "#ccc", fontWeight: "normal" }
              }
            >
              {item.item_name}
            </span>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              onClick={() => addToPurchase(item)}
              aria-label="add to cart"
              disabled={
                checkPurchaseList(item.id, item.company) === -1 ? false : true
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
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default PurchaseSearchList;
