import Promise from "bluebird";
import connectRedis from "connect-redis";
import session from "express-session";
import config from "./config";

Promise.promisifyAll(session.Session.prototype);

export default function Session(app) {
  const RedisStore = connectRedis(session);
  app.use(session({
    secret: config.sessionSecret,
    store: new RedisStore(config.redis),
    // ttl: 60 * 30,
  }));
}
