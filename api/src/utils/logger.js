import debug from "debug";
export default function logger(prefix = "", suffix = "") {
  const id = `[${(process || {}).pid || ""}]`;
  return {
    error: debug(`${id}${prefix}error${suffix}`),
    err: debug(`${id}${prefix}error${suffix}`),
    log: debug(`${id}${prefix}log${suffix}`),
    info: debug(`${id}${prefix}info${suffix}`),
    debug: debug(`${id}${prefix}debug${suffix}`),
    warn: debug(`${id}${prefix}debug${suffix}`),
    sql: debug(`${id}${prefix}sql${suffix}`),
  };
}
