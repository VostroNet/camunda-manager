import {GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLInputObjectType, GraphQLEnumType} from "graphql";

export const GQLDeploymentQuery = new GraphQLInputObjectType({
  name: "DeploymentQuery",
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString}, //Filter by the deployment name. Exact match.
    nameLike: {type: GraphQLString}, // Filter by the deployment name that the parameter is a substring of. The parameter can include the wildcard % to express like-strategy such as: starts with (%name), ends with (name%) or contains (%name%).
    source: {type: GraphQLString}, //	Filter by the deployment source.
    withoutSource: {type: GraphQLBoolean}, //	Filter by the deployment source whereby source is equal to null.
    tenantIdIn: {type: new GraphQLList(GraphQLString)}, //	Filter by a comma-separated list of tenant ids. A deployment must have one of the given tenant ids.
    withoutTenantId: {type: GraphQLBoolean}, //	Only include deployments which belong to no tenant. Value may only be true, as false is the default behavior.
    includeDeploymentsWithoutTenantId: {type: GraphQLBoolean}, //	Include deployments which belong to no tenant. Can be used in combination with tenantIdIn. Value may only be true, as false is the default behavior.
    after: {type: GraphQLString}, //	Restricts to all deployments after the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
    before: {type: GraphQLString}, //	Restricts to all deployments before the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
    sortBy: {type: new GraphQLEnumType({
      name: "DeploymentQuerySortBy",
      values: {
        id: {value: "id"},
        name: {value: "name"},
        deploymentTime: {value: "deploymentTime"},
        tenantId: {value: "tenantId"}
      }
    })}, //	Sort the results lexicographically by a given criterion. Valid values are id, name, deploymentTime and tenantId. Must be used in conjunction with the sortOrder parameter.
    sortOrder: {type: new GraphQLEnumType({
      name: "DeploymentQuerySortOrder",
      values: {
        asc: {value: "asc"},
        desc: {value: "desc"}
      }
    })}, //	Sort the results in a given order. Values may be asc for ascending order or desc for descending order. Must be used in conjunction with the sortBy parameter.
    firstResult: {type: GraphQLInt}, //	Pagination of results. Specifies the index of the first result to return.
    maxResults: {type: GraphQLInt}, //	Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.

  },
});

export const GQLDeployment = new GraphQLObjectType({
  name: "Deployment",
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    source: {type: GraphQLString},
    tenantId: {type: GraphQLString},
    deploymentTime: {type: GraphQLString},
  },
});
