import {graphqlExpress, graphiqlExpress} from "apollo-server-express";
import {apolloUploadExpress} from "apollo-upload-server";
import bodyParser from "body-parser";
import schema from "./schemas";

export default function createGraphql(app) {
  app.use("/api/graphql", bodyParser.json(), apolloUploadExpress({uploadDir: "./tmp/uploads"}), async(req, res, next) => {
    return graphqlExpress({
      schema: schema,
      context: {
        sendAttachment(name, data) {
          res.attachment(name);
          return res.end(data);
        },
        destroySession() {
          return req.session.destroy();
        },
      },
    })(req, res, next);
  });
  if (process.env.NODE_ENV !== "production") {
    app.get("/api/graphiql", graphiqlExpress({endpointURL: "/api/graphql"}));
  }
}
