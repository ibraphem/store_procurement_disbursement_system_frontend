import React, { useState } from "react";
import BackgroundImage from "../layouts/img/stock.jpg";
import "../layouts/css/bg.css";
import ErrorAlerts from "../layouts/alerts/ErrorAlerts";

const Login = ({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  login,
  alertMessage,
  iserror,
  handleChecked,
  isChecked,
}) => {
  return (
    <div
      className="bg"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 my-auto">
              {iserror ? <ErrorAlerts message={alertMessage} /> : null}
              <div className="card card-info ">
                <img src="dist/img/lo.png" className="logo" />
                <br />
                <div style={{ textAlign: "center" }}>
                  <span style={{ color: "blue" }}>
                    <b>Store</b>
                  </span>{" "}
                  -{" "}
                  <span style={{ color: "green" }}>
                    <b>Procurement</b>
                  </span>{" "}
                  -{" "}
                  <span style={{ color: "red" }}>
                    <b>Disbursement</b>
                  </span>
                </div>
                <form className="form-horizontal" onSubmit={login}>
                  <div className="card-body">
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <input
                          type="email"
                          onChange={handleEmailChange}
                          value={email}
                          className="form-control"
                          id="inputEmail3"
                          placeholder="Email"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <input
                          type="password"
                          onChange={handlePasswordChange}
                          value={password}
                          className="form-control"
                          id="inputPassword3"
                          placeholder="Password"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={handleChecked}
                        checked={isChecked}
                      />
                      <label
                        className="form-check-label"
                        onClick={handleChecked}
                      >
                        Remember Me
                      </label>
                    </div>
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer">
                    <button type="submit" className="btn btn-success">
                      Sign in
                    </button>
                  </div>
                  {/* /.card-footer */}
                </form>
              </div>
              {/* /.card */}
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
