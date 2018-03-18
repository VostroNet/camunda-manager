import {NodeModel} from "storm-react-diagrams";
import PortModel from "../port";

export default class ComponentNodeModel extends NodeModel {
  constructor(options) {
    super("component");
    this.options = options;
    this.ports = {};
    const {component} = options;
    this.inputKeys = Object.keys(component.input).reduce((obj, key, i, arr) => {
      let k, kname;
      if (arr.length > 1) {
        k = `${component.id}.input.${key}`;
        kname = key;
      } else {
        k = `${component.id}.input`;
        kname = "input";
      }
      obj[k] = kname;
      this.ports[k] = this.addPort(new PortModel(k));
      return obj;
    }, {});
    this.outputKeys = Object.keys(component.output).reduce((obj, key, i, arr) => {
      let k, kname;
      if (arr.length > 1) {
        k = `${component.id}.output.${key}`;
        kname = key;
      } else {
        k = `${component.id}.output`;
        kname = "output";
      }
      obj[k] = kname;
      this.ports[k] = this.addPort(new PortModel(k));
      return obj;
    }, {});
  }
}
