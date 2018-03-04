import fetch from "node-fetch";
import config from "../../config";
import {serialize} from "../../utils/http";

export function getDeployments(filter = {}, context) {
  const queryParams = serialize(filter);
  return fetch(`${config.camundaApi}/deployment?${queryParams}`).then((r) => r.json());
}

