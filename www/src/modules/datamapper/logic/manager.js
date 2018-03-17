import React from "react";
import PropTypes from "prop-types";
import { DiagramModel } from "storm-react-diagrams";

export default class DatamapperManager extends React.Component {
  constructor() {
    super();
    this.state = {
      dataModel: new DiagramModel()
    };
  }
  getChildContext() {
    return {dataModel: this.state.dataModel};
  }
  render() {
    return (<div>{this.props.children}</div>);
  }

}

DatamapperManager.childContextTypes = {
  dataModel: PropTypes.object,
};
