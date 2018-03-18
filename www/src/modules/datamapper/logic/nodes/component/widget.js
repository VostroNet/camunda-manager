import * as React from "react";
// import SchemaNodeModel from "./model";
import { PortWidget } from "storm-react-diagrams";
import "./style.scss";

export default class ComponentNodeWidget extends React.Component {
  static defaultProps = {
    size: 200,
    node: null
  };

  constructor(props) {
    super(props);
    this.state = {
      type: "user",
    };
  }
  handleSchemaChange(e) {
    this.setState({
      type: e.target.value,
    });
  }

  render() {
    const {title, component} = this.props.node.options;
    const {inputKeys, outputKeys} = this.props.node;

    const input = Object.keys(inputKeys).map((ik) => {
      return (<div key={ik} className="row align-items-center">
        <div className="col-auto">
          <PortWidget name={ik} node={this.props.node} />
        </div>
        <div className="col label">
          {inputKeys[ik]}
        </div>
      </div>);
    });
    const output = Object.keys(outputKeys).map((ik) => {
      return (<div key={ik} className="row align-items-center">
        <div className="col label">
          {outputKeys[ik]}
        </div>
        <div className="col-auto">
          <PortWidget name={ik} node={this.props.node} />
        </div>
      </div>);
    });

    return (<div className="component-node"
      style={{
        position: "relative",
        width: this.props.size
      }}>
      <div className="container-fluid no-gutters">
        <div className="row">
          <div className="col-12">
            {title}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="container-fluid no-gutters">
              {input}
            </div>
          </div>
          <div className="col-6">
            <div className="container-fluid no-gutters">
              {output}
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}
