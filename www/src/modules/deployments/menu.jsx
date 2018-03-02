import React from "react";

import LiLink from "../../components/li-link";

export default function Menu() {
  return (<div className="col-12 col-md-3 col-lg-3 col-xs-1">
    <ul className="submenu">
      <li className="submenu-header">
        {"Deployments"}
      </li>
      <LiLink to="/" exact activeClassName="active">
        {"List"}
      </LiLink>
      <LiLink to="/add" exact activeClassName="active">
        {"Add New Deployment"}
      </LiLink>
    </ul>
  </div>);
}
