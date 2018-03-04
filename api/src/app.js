import moment from "moment";
function toJSON() {
  return moment(this).format("YYYY-MM-DD HH:mm:ssZ");
}
Date.prototype.toJSON = toJSON; //eslint-disable-line
Date.prototype.toString = toJSON; //eslint-disable-line

import express from "express";
import bodyParser from "body-parser";
import sourceMapSupport from "source-map-support";
import config from "./config";
import session from "./session";
import initGraphQL from "./graphql";
import logger from "./utils/logger";
import fs from "fs";
import path from "path";
import compression from "compression";
import cors from "cors";
const log = logger("camunda-manager-api::index:");
sourceMapSupport.install();

const app = express();


function sendFile(file) {
  return (req, res, next) => {
    var fileStream = fs.createReadStream(path.resolve(__dirname, file));
    return fileStream.pipe(res);
  };
}

app.enable("trust proxy");
if (config.cors.length > 0) {
  app.use(cors({
    origin(origin, callback) {
      // console.log("daf", origin);
      if (!origin) {
        return callback(null, true);
      }
      if (!(config.cors.indexOf(origin) !== -1)) {
        console.log("CORS WOULD NOT ALLOW THIS", origin);
      }
      return callback(null, true);//disabling cors

      // if (config.express.cors.indexOf(origin) !== -1) {
      //   return callback(null, true);
      // }
      // return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }));
}
if (config.enableCompression) {
  app.use(compression());
}
app.use(express.static(path.resolve(__dirname, "./public")));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

session(app);
initGraphQL(app);

app.use(sendFile("./public/404/index.html"));


app.listen(config.httpPort, () => {
  log.info(`server listening on port ${config.httpPort}`);
});


