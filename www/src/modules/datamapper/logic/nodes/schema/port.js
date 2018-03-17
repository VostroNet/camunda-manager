// import * as _ from "lodash";
import { PortModel, DefaultLinkModel } from "storm-react-diagrams";

export default class SchemaPortModel extends PortModel {
  constructor(pos = "top") {
    super(pos, "schema");
    this.position = pos;
  }

  serialize() {
    return Object.assign(super.serialize(), {
      position: this.posi1tion
    });
  }

  deSerialize(data, engine) {
    super.deSerialize(data, engine);
    this.position = data.position;
  }

  createLinkModel() {
    return new DefaultLinkModel();
  }
}
