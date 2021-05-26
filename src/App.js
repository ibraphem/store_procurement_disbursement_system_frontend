import React, { useState } from "react";
import Header from "./components/layouts/Header";
import NavBar from "./components/layouts/NavBar";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Department from "./components/departments/Department";
import Supplier from "./components/suppliers/Supplier";
import Item from "./components/items/Item";
import PurchaseForm from "./components/purchases/PurchaseForm";
import Purchase from "./components/purchases/Purchase";
import Store from "./components/store/Store";
import Disbursement from "./components/disbursement/Disbursement";
import StoreDetail from "./components/store/StoreDetail";
import UniformList from "./components/uniforms/UniformList";
import Uniformer from "./components/uniforms/Uniformer";
import Report from "./components/report/Report";
import Login from "./components/auth/Login";
import axios from "axios";
import CookieService from "./components/auth/CookieService";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Signup from "./components/auth/Signup";
import { URD } from "../src/components/layouts/Config";
import PurchaseReport from "./components/report/PurchaseReport";
import ItemReport from "./components/report/ItemReport";
import ItemCategories from "./components/items/ItemCategories";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [iserror, setIserror] = useState();
  const [alertMessage, setAlertMessage] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  const expiresAt = 60 * 24;

  const login = async (e) => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${URD}/auth/login`, credentials);
      //  console.log(is);
      if (response) {
        if (!isChecked) {
          const options = { path: "/" };
          CookieService.set(
            "access_token",
            response.data.access_token,
            options
          );
          history.push("/dashboard");
        } else {
          let date = new Date();
          date.setTime(date.getTime() + expiresAt * 60 * 1000);

          const options = { path: "/", expires: date };
          CookieService.set(
            "access_token",
            response.data.access_token,
            options
          );
          history.push("/dashboard");
        }
      }
    } catch (error) {
      setIserror(true);
      setAlertMessage("Access Denied!!! Incorrect Login Credential");
      return false;
    }
  };

  const history = useHistory();
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => (
          <Login
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            login={login}
            email={email}
            password={password}
            iserror={iserror}
            alertMessage={alertMessage}
            handleChecked={handleChecked}
            isChecked={isChecked}
          />
        )}
      />
      <Route exact path="/register" component={Signup} />
      <>
        <>
          <Header />
          <NavBar />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/departments" component={Department} />
          <ProtectedRoute exact path="/suppliers" component={Supplier} />
          <ProtectedRoute
            exact
            path="/item/categories"
            component={ItemCategories}
          />
          <ProtectedRoute exact path="/items" component={Item} />
          <ProtectedRoute exact path="/store/:company" component={Store} />
          <ProtectedRoute
            exact
            path="/procurement/:company"
            component={Purchase}
          />
          <ProtectedRoute exact path="/purchases" component={Purchase} />
          <ProtectedRoute
            exact
            path="/form/:action/:company"
            component={PurchaseForm}
          />
          <ProtectedRoute
            exact
            path="/disbursement/:company"
            component={Disbursement}
          />
          <ProtectedRoute exact path="/uniforms" component={UniformList} />
          <ProtectedRoute
            exact
            path="/uniformer/:company"
            component={Uniformer}
          />
          <ProtectedRoute exact path="/report/monthly" component={Report} />
          <ProtectedRoute
            exact
            path="/reports/:action"
            component={PurchaseReport}
          />
          <ProtectedRoute
            exact
            path="/item/report/:id/:company/:item"
            component={ItemReport}
          />

          <ProtectedRoute
            exact
            path="/:item/:company/:id/details"
            component={StoreDetail}
          />
        </>
      </>
    </Switch>
  );
};

export default App;
