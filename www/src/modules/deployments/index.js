import React from "react";
import {MemoryRouter, Route} from "react-router";
import Menu from "./menu";

const IndexPage = () => (
  <MemoryRouter>
    <div className="container-fluid no-gutters">
      <div className="row">
        <Menu />
        <div className="col-12 col-md-9 col-lg-10 col-xs-11">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-3">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MemoryRouter>
);

export default {
  title: "Deployments",
  name: "deployments",
  icon: "fa-conveyor-belt",
  render: IndexPage,
};


