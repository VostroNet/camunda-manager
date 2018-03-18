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
    const {keys, options} = this.props.node;
    const {type, title} = options;
    return (
      <div className="schema-node"
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

          {Object.keys(keys).map((portName) => {
            switch (type) {
              case "output":
                return (<div key={portName} className="row align-items-center">
                  <div className="col-auto">
                    <PortWidget name={portName} node={this.props.node} />
                  </div>
                  <div className="col label">
                    {keys[portName]}
                  </div>
                </div>);

              case "input":
                return (<div key={portName} className="row align-items-center">
                  <div className="col label">
                    {keys[portName]}
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
