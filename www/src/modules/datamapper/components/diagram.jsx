import React from "react";
import PropTypes from "prop-types";
import { DiagramEngine, DiagramModel, DefaultNodeModel, DiagramWidget } from "storm-react-diagrams";

import SimplePortFactory from "../logic/simple-port-factory";
import SchemaPortFactory from "../logic/nodes/schema/factory";
import SchemaPortModel from "../logic/nodes/schema/model";

import "storm-react-diagrams/src/sass/main.scss";
import "../style/diagram.scss";

export default function Diagram(props, context) {
  //1) setup the diagram engine
  var engine = new DiagramEngine();
  engine.installDefaultFactories();
  engine.registerPortFactory(new SimplePortFactory("schema", config => new SchemaPortModel()));
  engine.registerNodeFactory(new SchemaPortFactory());
  // //2) setup the diagram model
  // var model = new DiagramModel();

  // //3-A) create a default node
  // var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
  // let port1 = node1.addOutPort("Out");
  // node1.setPosition(100, 100);

  // //3-B) create another default node
  // var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
  // let port2 = node2.addInPort("In");
  // node2.setPosition(400, 100);

  // // link the ports
  // let link1 = port1.link(port2);
  // link1.addLabel("Hello World!");

  // //4) add the models to the root graph
  // model.addAll(node1, node2, link1);

  // //5) load model into engine
  engine.setDiagramModel(context.dataModel);

  //6) render the diagram!
  return (<DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />);
}
Diagram.contextTypes = {
  dataModel: PropTypes.object
};
