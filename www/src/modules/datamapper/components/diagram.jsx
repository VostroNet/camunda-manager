import React from "react";
import PropTypes from "prop-types";
import { DiagramEngine, DiagramModel, DefaultNodeModel, DiagramWidget } from "storm-react-diagrams";

import SimplePortFactory from "../logic/simple-port-factory";
import SchemaPortFactory from "../logic/nodes/schema/factory";
// import SchemaPortModel from "../logic/nodes/schema/model";

import SchemaNodeModel from "../logic/nodes/schema/model";

import ComponentPortFactory from "../logic/nodes/component/factory";
import ComponentNodeModel from "../logic/nodes/component/model";

import "storm-react-diagrams/src/sass/main.scss";
import "../style/diagram.scss";

export default function Diagram(props, context) {
  //1) setup the diagram engine
  var engine = new DiagramEngine();
  engine.installDefaultFactories();
  engine.registerPortFactory(new SimplePortFactory("schema", config => new SchemaNodeModel()));
  engine.registerPortFactory(new SimplePortFactory("component", config => new ComponentNodeModel()));
  engine.registerNodeFactory(new SchemaPortFactory());
  engine.registerNodeFactory(new ComponentPortFactory());

  var model = new DiagramModel();
  model.addListener({
    linksUpdated() {
      console.log("linksUpdated", arguments);
    },
  });
  const project = context.mapper.getProject();

  if (project) {
    let nodes = {};
    nodes.input = new SchemaNodeModel({
      title: "Input",
      delete: false,
      schema: project.input,
      type: "input",
    });
    nodes.input.setPosition(0, 0);
    model.addAll(nodes.input);

    nodes.output = new SchemaNodeModel({
      title: "Output",
      schema: project.output,
      delete: false,
      type: "output",
    });
    nodes.output.setPosition(450, 0);
    model.addAll(nodes.output);

    project.rules.components.forEach((component) => {
      nodes[component.id] = new ComponentNodeModel({
        title: component.type,
        component,
      });
      nodes[component.id].setPosition(250, 0);
      model.addAll(nodes[component.id]);
    });
    let ports = {};
    Object.keys(nodes).forEach((n) => {
      ports = Object.assign(ports, nodes[n].ports);
    });
    project.rules.connections.forEach((connection) => {
      let port1 = ports[connection.source];
      let port2 = ports[connection.target];
      if(port1 && port2) {
        let link = port1.link(port2);
        model.addAll(link);
      } else {
        console.log("missing", {
          port1, port2, connection,
        });
      }
    });
  }
  var str = JSON.stringify(model.serializeDiagram());
  console.log("serial", str);
  engine.setDiagramModel(model);

  //6) render the diagram!
  return (<DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />);
}
Diagram.contextTypes = {
  mapper: PropTypes.object
};
