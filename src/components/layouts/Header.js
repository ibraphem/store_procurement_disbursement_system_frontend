import React from "react";
import Cookie from "universal-cookie";
import { useHistory } from "react-router-dom";

const Header = () => {
  const cookie = new Cookie();
  const history = useHistory();

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        {/* Messages Dropdown Menu */}
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="fa fa-power-off" />
          </a>
          <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
            <span
              className="dropdown-item dropdown-header"
              style={{ cursor: "pointer" }}
              onClick={() => {
                cookie.remove("access_token");
                history.push("/");
              }}
            >
              Log Out
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
