import * as React from "react";
// import SchemaNodeModel from "./model";
import { PortWidget } from "storm-react-diagrams";
import "./style.scss";

export default class SchemaNodeWidget extends React.Component {
  static defaultProps = {
    size: 150,
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


    return (
      <div className="schema-node"
        style={{
          position: "relative",
          width: this.props.size
        }}>
        <div className="container-fluid no-gutters">
          <div className="row">
            <div className="col-12">
              <select onChange={(e) => this.handleSchemaChange(e)} value={this.state.type}>
                <option value="user">{"User"}</option>
                <option value="device">{"Device"}</option>
              </select>
            </div>
          </div>

          {Object.keys(this.props.node.ports).map((portName) => {
            const {side} = this.props.node.options;
            switch (side) {
              case "left":
                return (<div key={portName} className="row">
                  <div className="col-auto">
                    <PortWidget name={portName} node={this.props.node} />
                  </div>
                  <div className="col label">
                    {portName}
                  </div>
                </div>);

              case "right":
                return (<div key={portName} className="row">
                  <div className="col label">
                    {portName}
                  </div>
                  <div className="col-auto">
                    <PortWidget name={portName} node={this.props.node} />
                  </div>
                </div>);

            }
            return undefined;
          })}
        </div>
      </div>
    );
  }
}
