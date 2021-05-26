import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import PurchaseHistory from "../purchases/PurchaseHistory";
import DisbursementHistory from "../disbursement/DisbursementHistory";
import { Link } from "react-router-dom";
import { URD } from "../layouts/Config";

const StoreDetail = () => {
  let params = useParams();
  let { item, company, id } = params;

  const formatDate = (date) => {
    return moment(date).format("MMM DD YYYY");
  };

  const [purchaseDate, setPurchaseDate] = useState("");
  const [disbursementDate, setDisbursementDate] = useState("");
  const [purchase, setPurchase] = useState([]);
  const [disburse, setDisburse] = useState([]);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    axios
      .get(
        `${URD}/${
          company === "Uniform" ? "stores" : "store"
        }/detail/${id}/${company}`
      )
      .then((response) => {
        // console.log(response.data.purchase);
        setPurchaseDate(response.data.purchase_date);
        setDisbursementDate(response.data.disbursement_date);
        setQuantity(response.data.quantity);
        setPurchase(response.data.purchase);
        setDisburse(response.data.disbursement);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [company]);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Item Details</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              {/* Profile Image */}
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <h3 className="profile-username text-center">{item}</h3>
                  <p className="text-muted text-center">{company}</p>
                  <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                      <b>Last Purchase :</b>{" "}
                      <a className="float-right">
                        {formatDate(purchaseDate?.purchase_date)}
                      </a>
                    </li>
                    <li className="list-group-item">
                      <b>Last Disburse :</b>{" "}
                      <a className="float-right">
                        {formatDate(disbursementDate?.disbursement_date)}
                      </a>
                    </li>
                    <li className="list-group-item">
                      <b>Quantity in Store :</b>{" "}
                      <a className="float-right">{quantity}</a>
                    </li>
                  </ul>
                  <Link
                    to={`/item/report/${id}/${company}/${item}`}
                    className="btn btn-primary btn-block"
                  >
                    <b>Fetch Report</b>
                  </Link>
                </div>
                {/* /.card-body */}
              </div>
            </div>
            {/* /.col */}
            <div className="col-md-9">
              <div className="card">
                <div className="card-header p-2">
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#activity"
                        data-toggle="tab"
                      >
                        Procurement History
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#timeline"
                        data-toggle="tab"
                      >
                        Disbursement History
                      </a>
                    </li>
                  </ul>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="tab-content">
                    <div className="active tab-pane" id="activity">
                      <PurchaseHistory purchases={purchase} company={company} />
                    </div>
                    {/* /.tab-pane */}
                    <div className="tab-pane" id="timeline">
                      <DisbursementHistory
                        disburses={disburse}
                        company={company}
                      />
                    </div>
                  </div>
                  {/* /.tab-content */}
                </div>
                {/* /.card-body */}
              </div>
              {/* /.nav-tabs-custom */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default StoreDetail;
