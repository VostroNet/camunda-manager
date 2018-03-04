import {GraphQLList} from "graphql";
import {GQLDeploymentQuery, GQLDeployment} from "../types/deployments";
import {getDeployments} from "../logic/deployments";

export const query = {
  type: new GraphQLList(GQLDeployment),
  args: {
    filter: {type: GQLDeploymentQuery},
  },
  async resolve(source, args, context, info) {
    try {
      return getDeployments((args || {}).filter, context);
    } catch (err) {
      // log.error(err);
      throw err;
    }
  }
};

