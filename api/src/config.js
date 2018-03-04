export default {
  camundaApi: process.env.CAMUNDA_API,
  httpPort: process.env.HTTP_PORT,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    db: process.env.REDIS_DB,
  },
  sessionSecret: process.env.SESSION_SECRET,
  enableCompression: process.env.GZIP === "true",
  cors: process.env.CORS ? process.env.CORS.split(",") : [],
};
