
import createMemoryHistory from "history/createMemoryHistory";
import store from "store";
import uuid from "uuid/v4";

import DeploymentModule from "../modules/deployments";
import HelloModule from "../modules/hello";
import DatamapperModule from "../modules/datamapper";

export default class TabManager {
  constructor() {
    this.modules = {};

    [DeploymentModule, HelloModule, DatamapperModule].forEach((module) => {
      this.modules[module.name] = module;
    });

    const {tabs, info} = store.get("tabs") || {};
    this.histories = {};
    this.tabs = tabs || [];
    this.tabInfo = info || {};
    if (this.tabs.length > 0) {
      this.tabs.forEach((id) => {
        const i = this.tabInfo[id];
        this.createHistory(id, i.path);
      });
    }

  }
  createHistory(id, path = "/") {
    this.histories[id] = createMemoryHistory({
      initialEntries: [path], // The initial URLs in the history stack
      initialIndex: 0, // The starting index in the history stack
      keyLength: 6, // The length of location.key
      // A function to use to confirm navigation with the user. Required
      // if you return string prompts from transition hooks (see below)
      getUserConfirmation: null,
    });
    this.histories[id].unlisten = this.histories[id].listen((location, action) => {
      this.tabInfo[id].path = `${location.pathname}${location.search}${location.hash}`;
      this.save();
      // console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
      // console.log(`The last navigation action was ${action}`);
    });

  }
  getHistory(id) {
    return this.histories[id];
  }
  getAll() {
    return this.tabs.map((id) => this.tabInfo[id]);
  }
  add(type) {
    const id = uuid();
    this.tabInfo[id] = {
      id, type,
    };
    this.tabs.push(id);
    this.createHistory(id);
    this.save();
    return id;
  }
  remove(id) {
    this.histories[id].unlisten();
    this.tabs = this.tabs.filter((t) => t !== id);
    delete this.tabInfo[id];
    delete this.histories[id];
    this.save();

  }
  save() {
    store.set("tabs", {
      tabs: this.tabs,
      info: this.tabInfo,
    });
  }
  setActiveTab(id) {
    store.set("active-tab", id);
  }
  getActiveTab() {
    return store.get("active-tab");
  }
  getKeys() {
    return this.tabs.slice(0);
  }
  getModules() {
    return this.modules;
  }
  getTab(tabId) {
    return this.tabInfo[tabId];
  }
  getTabs() {
    return this.tabs.map((t) => this.getTab(t));
  }
  getModuleForTab(tabId) {
    const tab = this.getTab(tabId);
    return this.modules[tab.type];
  }
}
