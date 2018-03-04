import React from "react";
import { ApolloProvider } from "react-apollo";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({ uri: "/api/graphql", credentials: "include" })
});

export default function ApolloManager(props) {
  return (<ApolloProvider client={client}>
    {props.children}
  </ApolloProvider>);
}
