import React from "react";
// import { Route } from "react-router";
import Menu from "./components/menu";
import Diagram from "./components/diagram";
import DatamapperManager from "./logic/manager";
function IndexPage() {
  return (<DatamapperManager>
    <div className="container-fluid no-gutters">
      <Menu />
      <div className="row">
        <div className="col">
          <Diagram />
        </div>
      </div>
    </div>
  </DatamapperManager>);
}

function Title() {
  return (<span>{"Datamapper"}</span>);
}
function Header() {
  return (<span>{"Datamapper"}</span>);
}

export default {
  header: Header,
  title: Title,
  name: "deployments",
  icon: "fa-database",
  render: IndexPage,
};


