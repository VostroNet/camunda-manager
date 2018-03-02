import React from "react";
import Link from "gatsby-link";
import uuid from "uuid/v4";

import DeploymentModule from "../modules/deployments";
import HelloModule from "../modules/hello";

let modules = {};

[DeploymentModule, HelloModule].forEach((module) => {
  modules[module.name] = module;
});


function getModuleForTab(tab) {
  return modules[tab.name];
}

class IndexPage extends React.Component {

  constructor() {
    super();
    this.state = {
      tabs: [],
      activeTab: undefined,
    };
  }
  addTab(name) {
    const newTab = {
      id: uuid(),
      name,
    };
    let activeTab = this.state.activeTab;
    if (!activeTab) {
      activeTab = newTab;
    }
    return this.setState({
      activeTab,
      tabs: this.state.tabs.concat(newTab),
    });
  }
  setActiveTab(activeTab) {
    return this.setState({
      activeTab,
    });
  }
  closeTab(e, tab) {
    e.stopPropagation();
    let activeTab = this.state.activeTab;
    if (this.state.activeTab.id === tab.id) {
      activeTab = null;
    }
    if (this.state.tabs.length === 1) {
      activeTab = null;
    }
    if (!activeTab && this.state.tabs.length > 1) {
      activeTab = this.state.tabs[0];
    }
    return this.setState({
      activeTab,
      tabs: this.state.tabs.filter((t) => {
        return t.id !== tab.id;
      }),
    });
  }

  render() {
    return (<div className="container-fluid no-gutters">
      <div className="row">
        <div className="col-md-auto col-12">
          <ul className="navmenu">
            <li>
              <Link to="/" exact activeClassName="active">
                <i className="fal fa-home" />
              </Link>
            </li>
            {Object.keys(modules).map((moduleName) => {
              const module = modules[moduleName];
              return (<li key={module.name}>
                <a href="#" onClick={() => this.addTab(module.name)}>
                  <i className={`fal ${module.icon}`} />
                </a>
              </li>);
            })}
          </ul>
        </div>
        <div className="col">
          <div className="container-fluid">
            <div className="row header">
              <div className="col-auto">
                {!this.state.activeTab ? (
                  <h1>
                    <i className={"fal fa-home header-icon"} />
                    {"Camunda Manager"}
                  </h1>
                ) : (
                  <h1>
                    <i className={`fal ${getModuleForTab(this.state.activeTab).icon} header-icon`} />
                    {getModuleForTab(this.state.activeTab).title}
                  </h1>
                )}
              </div>
              {this.state.activeTab ? (<div className="col header-close-icon" style={{textAlign: "right"}}>
                <a href="#" className="tab-close" onClick={(e) => this.closeTab(e, this.state.activeTab)}>
                  <i className="fal fa-times"/>
                </a>
              </div>) : undefined}
            </div>
          </div>
          <div className="container-fluid no-gutters">
            <div className="row tab-header-row">
              {this.state.tabs.map((tab) => {
                return (<div key={tab.id} className="col-auto">
                  <div onClick={() => this.setActiveTab(tab)} className={`tab-header ${this.state.activeTab ? (this.state.activeTab.id === tab.id ? "active" : "") : ""}`}>
                    <a href="#" className="tab-close" onClick={(e) => this.closeTab(e, tab)}>
                      <i className="fal fa-times-square" />
                    </a>
                    {getModuleForTab(tab).title}
                  </div>
                </div>);
              })}
            </div>
            <div className="row">
              {
                this.state.tabs.map((tab) => {
                  const Render = getModuleForTab(this.state.activeTab).render;
                  return (<div key={tab.id} style={{display: tab.id === (this.state.activeTab || {}).id ? undefined : "none", width: "100%" }}>
                    <Render tab={this.state.activeTab} />
                  </div>);
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default IndexPage;
