import React from "react";
import PropTypes from "prop-types";
// import { DiagramModel } from "storm-react-diagrams";
import Project from "./project";

export default class DatamapperManager extends React.Component {
  constructor() {
    super();
    this.state = {
      // model: new DiagramModel()
      project: undefined,
    };
  }
  getChildContext() {
    return {
      mapper: {
        loadProject: (schema, rules) => this.loadProject(schema, rules),
        getProject: () => {
          return this.state.project;
        }
        // model: this.state.model,
        // refresh: () => {
        //   return new Promise((resolve, reject) => {
        //     return this.forceUpdate(resolve);
        //   });
        // }
      }
    };
  }
  loadProject(schema, rules) {
    return new Promise(async(resolve, reject) => {
      return this.setState({
        project: await Project.load(schema, rules),
      }, resolve);
    });
  }
  render() {
    return (<div>{this.props.children}</div>);
  }
}

DatamapperManager.childContextTypes = {
  mapper: PropTypes.object,
};
