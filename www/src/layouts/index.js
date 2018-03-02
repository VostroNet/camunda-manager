import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Link from "gatsby-link";

// import Header from "../components/Header";
import "../style/index.scss";

const TemplateWrapper = ({children}) => (
  <div>
    <Helmet
      title="Camunda Manager"
      meta={[]}
    />
    {children()}
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
