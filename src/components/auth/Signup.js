import React, { useState } from "react";
import "../layouts/css/bg.css";
import axios from "axios";
import ErrorAlerts from "../layouts/alerts/ErrorAlerts";
import SuccessAlerts from "../layouts/alerts/SuccessAlerts";
import { URD } from "../layouts/Config";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [iserror, setIserror] = useState();
  const [alertMessage, setAlertMessage] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const register = async (e) => {
    e.preventDefault();
    const credentials = {
      name: username,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${URD}/auth/signup`, credentials);

      if (response) {
        setIserror(false);
        setAlertMessage("User created successfully");
      }
    } catch (error) {
      setIserror(true);
      setAlertMessage("OOPs, Something went wrong");
      return false;
    }
  };

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 my-auto">
              {iserror ? <ErrorAlerts message={alertMessage} /> : null}
              {iserror === false ? (
                <SuccessAlerts message={alertMessage} />
              ) : null}

              <div className="card card-info ">
                <img src="dist/img/lo.png" className="logo" />

                <form className="form-horizontal" onSubmit={register}>
                  <div className="card-body">
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <input
                          type="text"
                          onChange={handleNameChange}
                          value={username}
                          className="form-control"
                          id="inputEmail3"
                          placeholder="Name"
                          required
                        />
                      </div>
                    </div>
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
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer">
                    <button type="submit" className="btn btn-success">
                      Sign Up
                    </button>
                    <Link to="/">
                      <button
                        type="button"
                        className="btn btn-info float-right"
                      >
                        Login
                      </button>
                    </Link>
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
    </>
  );
};

export default Signup;
