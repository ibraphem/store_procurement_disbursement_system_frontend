import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="index3.html" className="brand-link">
        <img
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Alexander Pierce
            </a>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library */}
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                <i className="nav-icon fas fa-th" />
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/items" className="nav-link">
                <i className="nav-icon fas fa-th" />
                <p>Items</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/departments" className="nav-link">
                <i className="nav-icon fas fa-th" />
                <p>Stations/Units/Depts</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/suppliers" className="nav-link">
                <i className="nav-icon fas fa-th" />
                <p>Suppliers</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-chart-pie" />
                <p>
                  Store
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={`/store/Landover`} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Landover</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/store/Overland`} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Overland</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-chart-pie" />
                <p>
                  Procurement
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={`/procurement/Landover`} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Landover</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/procurement/Overland`} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Overland</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-chart-pie" />
                <p>
                  Disbursement
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={`/disbursement/Landover`} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Landover</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/disbursement/Overland`} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Overland</p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default NavBar;
