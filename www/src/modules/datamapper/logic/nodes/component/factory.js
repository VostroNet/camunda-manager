import React from "react";
import {AbstractFactory} from "storm-react-diagrams";
import ComponentNodeWidget from "./widget";
import ComponentNodeModel from "./model";

export default class ComponentNodeFactory extends AbstractFactory {
  constructor() {
    super("component");
  }

  generateReactWidget(diagramEngine, node) {
    return <ComponentNodeWidget node={node} />;
  }

  getNewInstance() {
    return new ComponentNodeModel();
  }
}
