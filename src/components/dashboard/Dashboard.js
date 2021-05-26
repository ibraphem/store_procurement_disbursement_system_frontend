import React, { useState, useEffect } from "react";
import TopSpenders from "./TopSpenders";
import Reorder from "./Reorder";
import { URD } from "../layouts/Config";
import axios from "axios";
import { Link } from "react-router-dom";
import RecentPurchase from "./RecentPurchase";

const Dashboard = () => {
  const [counter, setCounter] = useState([]);

  useEffect(() => {
    axios
      .get(`${URD}/counter`)
      .then((response) => {
        setCounter(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Dashboard</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{counter.items}</h3>
                  <h4>Items</h4>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <Link to="/items" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{counter.suppliers}</h3>
                  <h4>Suppliers</h4>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <Link to="/suppliers" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{counter.departments}</h3>
                  <h4>Div/Units</h4>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <Link to="/departments" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-primary">
                <div className="inner">
                  <h3>{counter.uniforms}</h3>
                  <p>Uniforms</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <Link to="uniforms" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            {/* ./col */}
          </div>
          {/* /.row */}
          {/* Main row */}
          <div className="row">
            {/* Left col */}
            <section className="col-lg-7 connectedSortable">
              {/* Custom tabs (Charts with tabs)*/}
              <div className="card">
                <div className="card-header">
                  <ul className="card-title nav nav-pills">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#revenue-chart"
                        data-toggle="tab"
                      >
                        Landover
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#sales-chart"
                        data-toggle="tab"
                      >
                        Overland
                      </a>
                    </li>
                  </ul>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="tab-content p-0">
                    {/* Morris chart - Sales */}
                    <div
                      className="chart tab-pane active"
                      id="revenue-chart"
                      style={{
                        position: "relative",
                        minHeight: 350,
                      }}
                    >
                      <TopSpenders company="Landover" />
                    </div>
                    <div
                      className="chart tab-pane"
                      id="sales-chart"
                      style={{ position: "relative", minHeight: 350 }}
                    >
                      <TopSpenders company="Overland" />
                    </div>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
            </section>
            {/* /.Left col */}
            {/* right col (We are only adding the ID to make the widgets sortable)*/}
            <section className="col-lg-5 connectedSortable">
              {/* Map card */}
              <div
                className="card"
                style={{ backgroundColor: "#dc3545", color: "#fff" }}
              >
                <div className="card-header border-0">
                  <h3 className="card-title">
                    <b>Items at re-order level</b>
                  </h3>
                  {/* card tools */}
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                  {/* /.card-tools */}
                </div>
                <div className="card-body">
                  <div style={{ minHeight: 360 }}>
                    <Reorder />
                  </div>
                </div>
                {/* /.card-body*/}
              </div>
            </section>
            <section className="col-lg-12 connectedSortable">
              {/* Map card */}
              <div className="card">
                <RecentPurchase />

                {/* /.card-body*/}
              </div>
            </section>
          </div>
          {/* /.row (main row) */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default Dashboard;
