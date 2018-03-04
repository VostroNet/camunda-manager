import React from "react";

const IndexPage = () => (
  <div>
    <div className="container-fluid no-gutters">
      <div className="row">
        <div className="col-12">
          {"Hello"}
        </div>
      </div>
    </div>
  </div>
);

export default {
  header() {
    return (<h1>
      <i className={"fal fa-phone-volume header-icon"} />
      {"Hello"}
    </h1>);
  },
  title() {
    return (<span>{"Hello"}</span>);
  },
  name: "hello",
  icon: "fa-phone-volume",
  render: IndexPage,
};



