import React from "react";
import Header from "./components/layouts/Header";
import NavBar from "./components/layouts/NavBar";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Department from "./components/departments/Department";
import Supplier from "./components/suppliers/Supplier";
import Item from "./components/items/Item";
import PurchaseForm from "./components/purchases/PurchaseForm";
import Purchase from "./components/purchases/Purchase";

const App = () => {
  return (
    <Switch>
      <>
        <Header />
        <NavBar />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/departments" component={Department} />
        <Route exact path="/suppliers" component={Supplier} />
        <Route exact path="/items" component={Item} />
        <Route exact path="/purchases" component={Purchase} />
        <Route exact path="/purchaseform" component={PurchaseForm} />
      </>
    </Switch>
  );
};

export default App;
