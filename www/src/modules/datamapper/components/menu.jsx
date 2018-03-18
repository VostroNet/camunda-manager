import React from "react";
import PropTypes from "prop-types";
// import { DefaultNodeModel } from "storm-react-diagrams";

import schemaJson from "../logic/data/schema.json";
import rulesJson from "../logic/data/rules.json";

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
      context.mapper.loadProject(schemaJson, rulesJson);
    }} />
    <MenuItem icon="fa-save" />
    <MenuItem icon="fa-sitemap" />
  </div>);
}
Menu.contextTypes = {
  mapper: PropTypes.object
};
