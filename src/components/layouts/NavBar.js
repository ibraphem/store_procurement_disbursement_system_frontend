import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const NavBar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}

      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            <h5 style={{ color: "#fff" }}>STORE MANAGEMENT</h5>
          </div>
        </div>

        <Nav />
        {/*      <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
          Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library 
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link active">
                <i className="nav-icon fas fa-th" />
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/items" className="nav-link">
                <i className="nav-icon fas fa-sitemap" />
                <p>Items</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/departments" className="nav-link">
                <i className="nav-icon fas fa-university" />
                <p>Div/Units</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/suppliers" className="nav-link">
                <i className="nav-icon fas fa-address-card" />
                <p>Suppliers</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <a style={{ cursor: "pointer" }} className="nav-link">
                <i className="nav-icon fas fa-archive" />
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
              <a style={{ cursor: "pointer" }} className="nav-link">
                <i className="nav-icon fas fa-cart-plus" />
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
              <a style={{ cursor: "pointer" }} className="nav-link">
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
            <li className="nav-item has-treeview">
              <a style={{ cursor: "pointer" }} className="nav-link">
                <i className="nav-icon fas fa-anchor" />
                <p>
                  Uniforms
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/uniforms" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>List</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/uniformer/Landover`} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Landover</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/uniformer/Overland`} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Overland</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview">
              <a style={{ cursor: "pointer" }} className="nav-link">
                <i className="nav-icon fas fa-book" />
                <p>
                  Report
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={`/report/monthly`} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Monthly</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/reports/Procurement`} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Procurement</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/reports/Disbursement`} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Disbursement</p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
       */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default NavBar;
