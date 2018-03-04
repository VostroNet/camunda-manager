import React from "react";
import Menu from "./menu";
import {Route} from "react-router";

const IndexPage = () => (
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
);


const Header = function() {
  return (<h1>
    <i className={"fal fa-conveyor-belt header-icon"} />
    <span>
      <Route exact path="/" component={() => {
        return (<span>{"Deployment"}</span>)
      }} />
      <Route exact path="/add" component={() => {
        return (<span>{"Add New Deployment"}</span>)
      }} />
    </span>
  </h1>)
}
export default {
  header: Header,
  title() {
  return (<span>{"Deployments"}</span>);
  },
  name: "deployments",
  icon: "fa-conveyor-belt",
  render: IndexPage,
};


