// import * as _ from "lodash";
import { PortModel, DefaultLinkModel } from "storm-react-diagrams";

export default class ComponentPortModel extends PortModel {
  constructor(name, type) {
    super(name, "port");
    this.name = name;
  }

  serialize() {
    return Object.assign(super.serialize(), {
      name: this.name,
    });
  }

  deSerialize(data, engine) {
    super.deSerialize(data, engine);
    this.name = data.name;
  }

  createLinkModel() {
    return new DefaultLinkModel("link");
  }
  link(port) {
    let link = this.createLinkModel();
    link.setSourcePort(this);
    link.setTargetPort(port);
    return link;
  }

  canLinkToPort(port) {
    // if (port instanceof ComponentPortModel) {
    //   return this.in !== port.in;
    // }
    return true;
  }
}
