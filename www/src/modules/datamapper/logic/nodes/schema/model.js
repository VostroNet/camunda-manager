import {NodeModel} from "storm-react-diagrams";
import SchemaPortModel from "./port";

export default class SchemaNodeModel extends NodeModel {
  constructor(options) {
    super("schema");
    this.options = options;
    console.log("SchemaNodeModel", this);
    this.addPort(new SchemaPortModel("user.id"));
    this.addPort(new SchemaPortModel("user.firstName"));
    this.addPort(new SchemaPortModel("user.lastName"));
    this.addPort(new SchemaPortModel("user.devices"));
  }
}
