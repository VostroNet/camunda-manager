// import * as _ from "lodash";
import { PortModel, DefaultLinkModel } from "storm-react-diagrams";

export default class ComponentPortModel extends PortModel {
  constructor(pos = "top") {
    super(pos, "schema");
    this.position = pos;
  }

  serialize() {
    return Object.assign(super.serialize(), {
      position: this.position,
    });
  }

  deSerialize(data, engine) {
    super.deSerialize(data, engine);
    this.position = data.position;
  }

  createLinkModel() {
    return new DefaultLinkModel();
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

  createLinkModel() {
    let link = super.createLinkModel();
    return link || new DefaultLinkModel();
  }
}
