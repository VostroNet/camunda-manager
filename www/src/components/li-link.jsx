import React from "react";
import {withRouter, matchPath} from "react-router";
import {Link} from "react-router-dom";

export default withRouter(function({
  match, location, history,
  to,
  activeClassName,
  children,
  staticContext,
  exact,
  ...componentProps
}) {
  let className = `${componentProps.className} ${matchPath(location.pathname, {
    path: to,
    exact,
  }) ? activeClassName : ""}`;
  return (<li {...componentProps} className={className}>
    {(to) ? (<Link to={to}>
      {children}
    </Link>) : (<a>{children}</a>)}
  </li>);
});
