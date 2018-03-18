import {NodeModel} from "storm-react-diagrams";
import PortModel from "../port";

export default class SchemaNodeModel extends NodeModel {
  constructor(options) {
    super("schema");
    this.options = options;
    const {schema, type} = options;
    this.ports = {};
    this.keys = Object.keys(schema.properties).reduce((obj, key) => {
      const k = `${type}.${key}`;
      this.ports[k] = this.addPort(new PortModel(k));
      obj[k] = key;
      return obj;
    }, {});

    // this.addPort(new SchemaPortModel("user.firstName"));
    // this.addPort(new SchemaPortModel("user.lastName"));
    // this.addPort(new SchemaPortModel("user.devices"));
  }
}
