import "babel-polyfill";
import dotenv from "dotenv";
dotenv.config();
import cluster from "cluster";
import logger from "./utils/logger";
const log = logger("camunda-manager::index:");

const numCPUs = parseInt(process.env.THREADS || 1);

if (cluster.isMaster) {
  log.info(`Master ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    log.info(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  log.info(`Worker ${process.pid} started`);
  require("./app");
}
