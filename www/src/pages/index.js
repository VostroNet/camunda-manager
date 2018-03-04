import React from "react";
import Link from "gatsby-link";
import {Router as MemoryRouter} from "react-router";

import TabManager from "../managers/tabs";
import ApolloManager from "../managers/apollo";


class IndexPage extends React.Component {

  constructor() {
    super();
    this.tabManager = new TabManager();
    this.state = {
      tabs: this.tabManager.getKeys(),
      activeTab: this.tabManager.getActiveTab(),
    };
  }
  addTab(type) {
    const tabId = this.tabManager.add(type);
    let activeTab = this.state.activeTab;
    if (!activeTab) {
      this.tabManager.setActiveTab(tabId);
      activeTab = tabId;
    }

    return this.setState({
      activeTab,
      tabs: this.tabManager.getKeys(),
    });
  }
  setActiveTab(tabId) {
    this.tabManager.setActiveTab(tabId);
    return this.setState({
      activeTab: tabId,
    });
  }
  closeTab(e, tabId) {
    e.stopPropagation();
    this.tabManager.remove(tabId);
    const tabs = this.tabManager.getKeys();
    let activeTab = this.state.activeTab;
    if (this.state.activeTab === tabId) {
      activeTab = null;
    }
    if (this.state.tabs.length === 1) {
      activeTab = null;
    }
    if (!activeTab && this.state.tabs.length > 1) {
      activeTab = tabs[0];
    }
    this.tabManager.setActiveTab(activeTab);
    return this.setState({
      activeTab,
      tabs,
    });
  }

  render() {
    const modules = this.tabManager.getModules();

    const tabs = this.tabManager.getTabs();


    return (<ApolloManager>
      <div className="container-fluid no-gutters">
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
                    <MemoryRouter key={this.state.activeTab} history={this.tabManager.getHistory(this.state.activeTab)}>
                      {this.tabManager.getModuleForTab(this.state.activeTab).header()}
                    </MemoryRouter>
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
                {tabs.map((tab) => {
                  return (<div key={tab.id} className="col-auto">
                    <div onClick={() => this.setActiveTab(tab.id)} className={`tab-header ${this.state.activeTab ? (this.state.activeTab === tab.id ? "active" : "") : ""}`}>
                      <a href="#" className="tab-close" onClick={(e) => this.closeTab(e, tab.id)}>
                        <i className="fal fa-times-square" />
                      </a>
                      <MemoryRouter history={this.tabManager.getHistory(tab.id)}>
                        {this.tabManager.getModuleForTab(tab.id).title()}
                      </MemoryRouter>
                    </div>
                  </div>);
                })}
              </div>
              <div className="row">
                {
                  tabs.map((tab) => {
                    const mod = this.tabManager.getModuleForTab(tab.id);
                    const Render = mod.render;
                    return (<div key={tab.id} style={{display: tab.id === this.state.activeTab ? undefined : "none", width: "100%" }}>
                      <MemoryRouter history={this.tabManager.getHistory(tab.id)}>
                        <Render tab={tab} />
                      </MemoryRouter>
                    </div>);
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </ApolloManager>);
  }
}

export default IndexPage;
