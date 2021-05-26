import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookie from "universal-cookie";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const cookie = new Cookie();

  const token = cookie.get("access_token");
  // console.log(token);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
