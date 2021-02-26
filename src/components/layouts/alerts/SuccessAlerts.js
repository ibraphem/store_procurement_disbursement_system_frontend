import React from "react";

const SuccessAlerts = ({ message }) => {
  return (
    <div className="col-md-12">
      <div className="card card-outline card-success">
        <div className="card-header" style={{ backgroundColor: "#28a745" }}>
          <h3 className="card-title" style={{ color: "#fff" }}>
            {message}
          </h3>
          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="remove"
            >
              <i className="fas fa-times" style={{ color: "#fff" }} />
            </button>
          </div>
          {/* /.card-tools */}
        </div>
      </div>
      {/* /.card */}
    </div>
  );
};

export default SuccessAlerts;
