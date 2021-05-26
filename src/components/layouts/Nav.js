import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import StoreIcon from "@material-ui/icons/Store";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import GroupIcon from "@material-ui/icons/Group";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useHistory } from "react-router-dom";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import NoteIcon from "@material-ui/icons/Note";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  navLink: {
    color: "#000",
  },
}));

const Nav = () => {
  const classes = useStyles();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const history = useHistory();

  const handleClick1 = (event, index) => {
    setOpen1(!open1);
    setSelectedIndex(index);
  };
  const handleClick2 = (event, index) => {
    setOpen2(!open2);
    setSelectedIndex(index);
  };
  const handleClick3 = (event, index) => {
    setOpen3(!open3);
    setSelectedIndex(index);
  };
  const handleClick4 = (event, index) => {
    setOpen4(!open4);
    setSelectedIndex(index);
  };
  const handleClick5 = (event, index) => {
    setOpen5(!open5);
    setSelectedIndex(index);
  };
  const handleClick6 = (event, index) => {
    setOpen6(!open6);
    setSelectedIndex(index);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const redir = (event) => {
    history.push(event.target.value);
    console.log(event.target.value);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <Link to="/dashboard">
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText className={classes.navLink} primary="Dashboard" />
        </ListItem>
      </Link>

      <ListItem
        button
        selected={selectedIndex === 9}
        onClick={(event) => handleClick6(event, 9)}
      >
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText primary="Item" />
        {open6 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open6} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <RadioGroup
            aria-label="gender"
            className={classes.nested}
            onChange={redir}
          >
            <FormControlLabel
              value="/item/categories"
              control={<Radio />}
              label="Categories"
            />
            <FormControlLabel value="/items" control={<Radio />} label="List" />
          </RadioGroup>
        </List>
      </Collapse>

      <Link to="/departments">
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText className={classes.navLink} primary="Div/Units" />
        </ListItem>
      </Link>

      <Link to="/suppliers">
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText className={classes.navLink} primary="Suppliers" />
        </ListItem>
      </Link>

      <ListItem
        button
        selected={selectedIndex === 4}
        onClick={(event) => handleClick1(event, 4)}
      >
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Store" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <RadioGroup
            aria-label="gender"
            className={classes.nested}
            onChange={redir}
          >
            <FormControlLabel
              value="/store/Landover"
              control={<Radio />}
              label="Landover"
            />
            <FormControlLabel
              value="/store/Overland"
              control={<Radio />}
              label="Overland"
            />
          </RadioGroup>
        </List>
      </Collapse>

      <ListItem
        button
        selected={selectedIndex === 5}
        onClick={(event) => handleClick2(event, 5)}
      >
        <ListItemIcon>
          <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Procurement" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <RadioGroup
            aria-label="gender"
            className={classes.nested}
            onChange={redir}
          >
            <FormControlLabel
              value="/procurement/Landover"
              control={<Radio />}
              label="Landover"
            />
            <FormControlLabel
              value="/procurement/Overland"
              control={<Radio />}
              label="Overland"
            />
          </RadioGroup>
        </List>
      </Collapse>

      <ListItem
        button
        selected={selectedIndex === 6}
        onClick={(event) => handleClick3(event, 6)}
      >
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary="Disbursement" />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <RadioGroup
            aria-label="gender"
            className={classes.nested}
            onChange={redir}
          >
            <FormControlLabel
              value="/disbursement/Landover"
              control={<Radio />}
              label="Landover"
            />
            <FormControlLabel
              value="/disbursement/Overland"
              control={<Radio />}
              label="Overland"
            />
          </RadioGroup>
        </List>
      </Collapse>

      <ListItem
        button
        selected={selectedIndex === 7}
        onClick={(event) => handleClick4(event, 7)}
      >
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText primary="Uniform" />
        {open4 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <RadioGroup
            aria-label="gender"
            className={classes.nested}
            onChange={redir}
          >
            <FormControlLabel
              value="/uniforms"
              control={<Radio />}
              label="List"
            />
            <FormControlLabel
              value="/store/Uniform"
              control={<Radio />}
              label="Store"
            />
            <FormControlLabel
              value="/uniformer/Landover"
              control={<Radio />}
              label="Landover"
            />
            <FormControlLabel
              value="/uniformer/Overland"
              control={<Radio />}
              label="Overland"
            />
          </RadioGroup>
        </List>
      </Collapse>

      <ListItem
        button
        selected={selectedIndex === 8}
        onClick={(event) => handleClick5(event, 8)}
      >
        <ListItemIcon>
          <NoteIcon />
        </ListItemIcon>
        <ListItemText primary="Report" />
        {open5 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open5} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <RadioGroup
            aria-label="gender"
            className={classes.nested}
            onChange={redir}
          >
            <FormControlLabel
              value="/report/monthly"
              control={<Radio />}
              label="Monthly"
            />
            <FormControlLabel
              value="/reports/Procurement"
              control={<Radio />}
              label="Procurement"
            />
            <FormControlLabel
              value="/reports/Disbursement"
              control={<Radio />}
              label="Disbursement"
            />
            <FormControlLabel
              value="/reports/Store"
              control={<Radio />}
              label="Store"
            />
          </RadioGroup>
        </List>
      </Collapse>
    </List>
  );
};

export default Nav;
