import React from "react";

const Hints = ({ hints }) => {
  return (
    <div id="accordion">
      {hints.length >= 1 && (
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0" style={{ textAlign: "center" }}>
              <button
                className="btn btn-link collapsed"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Hint #1
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="card-body" style={{ textAlign: "center" }}>
              {hints[0]}
            </div>
          </div>
        </div>
      )}
      {hints.length >= 2 && (
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h5 className="mb-0" style={{ textAlign: "center" }}>
              <button
                className="btn btn-link collapsed"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Hint #2
              </button>
            </h5>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordion"
          >
            <div className="card-body" style={{ textAlign: "center" }}>
              {hints[1]}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hints;
