// import Raven from "raven-js";
// Raven.config("https://28c886d76cca44639935a1de1c5d46be@www.rcl.hs.authentication.technology:18443/2").install();

import "babel-polyfill";
// import "whatwg-fetch";
import {polyfill} from "es6-promise";
polyfill();
import "isomorphic-fetch";
