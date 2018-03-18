import {AbstractFactory, PortModel} from "storm-react-diagrams";

export default class SimplePortFactory extends AbstractFactory {
  constructor(type, cb = (initialConfig) => PortModel) {
    console.log("super");
    super(type);
    this.cb = cb;
  }

  getNewInstance(initialConfig) {
    return this.cb(initialConfig);
  }
}
