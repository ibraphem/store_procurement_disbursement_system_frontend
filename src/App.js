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
import Store from "./components/store/Store";
import Disbursement from "./components/disbursement/Disbursement";
import StoreDetail from "./components/store/StoreDetail";

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
        <Route exact path="/store/:company" component={Store} />
        <Route exact path="/procurement/:company" component={Purchase} />
        <Route exact path="/purchases" component={Purchase} />
        <Route exact path="/form/:action/:company" component={PurchaseForm} />
        <Route exact path="/disbursement/:company" component={Disbursement} />
        <Route
          exact
          path="/:item/:company/:id/details"
          component={StoreDetail}
        />
      </>
    </Switch>
  );
};

export default App;
