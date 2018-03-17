import React from "react";
import PropTypes from "prop-types";
import { DefaultNodeModel } from "storm-react-diagrams";
import "../style/menu.scss";
function MenuItem(props) {
  return (<div className="col-auto menu-item" onClick={props.onClick}>
    <i className={`fal ${props.icon}`} />
  </div>);
}

import SchemaNodeModel from "../logic/nodes/schema/model";


export default function Menu(props, context) {
  return (<div className="row menu-row">
    <MenuItem icon="fa-folder-open" onClick={() => {
      //3-A) create a default node
      var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
      let port1 = node1.addOutPort("Out");
      node1.setPosition(100, 100);

      //3-B) create another default node
      var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
      let port2 = node2.addInPort("In");
      node2.setPosition(400, 100);

      // link the ports
      let link1 = port1.link(port2);
      link1.addLabel("Hello World!");

      var node3 = new SchemaNodeModel({side: "right"});
      node3.setPosition(250, 108);

      var node4 = new SchemaNodeModel({side: "left"});
      node4.setPosition(350, 108);
      //4) add the models to the root graph
      context.dataModel.addAll(node1, node2, link1, node3, node4);
    }} />
    <MenuItem icon="fa-save" />
    <MenuItem icon="fa-sitemap" />
  </div>);
}
Menu.contextTypes = {
  dataModel: PropTypes.object
};
