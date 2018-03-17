import React from "react";
import {AbstractFactory} from "storm-react-diagrams";
import SchemaNodeWidget from "./widget";
import SchemaNodeModel from "./model";

export default class SchemaNodeFactory extends AbstractFactory {
  constructor() {
    super("schema");
  }

  generateReactWidget(diagramEngine, node) {
    return <SchemaNodeWidget node={node} />;
  }

  getNewInstance() {
    return new SchemaNodeModel();
  }
}
