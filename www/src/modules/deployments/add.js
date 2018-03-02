import React from "react";
import Link from "gatsby-link";
import Menu from "../../components/deployments/menu";

const IndexPage = () => (
  <div>
    <div className="container-fluid">
      <div className="row header">
        <div className="col-12">
          <h1>
            <Link className="header-icon" to="/deployments/">
              <i className="fal fa-arrow-to-left"/>
            </Link>
            {"Add a New Deployment"}
          </h1>
        </div>
      </div>
    </div>
    <div className="container-fluid no-gutters">
      <div className="row">
        <Menu />
        <div className="col-12 col-md-9 col-lg-10 col-xs-11">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-3">
                {""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default IndexPage;
