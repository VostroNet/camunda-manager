import {GraphQLSchema, GraphQLObjectType} from "graphql";

import {query as deploymentQuery} from "./deployments";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Queries",
    fields: {
      "deployments": deploymentQuery,
    },
    resolve() {
      return {};
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {},
    resolve() {
      return {};
    },
  }),
});

export default schema;
