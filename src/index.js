let poly = require("preact-cli/lib/lib/webpack/polyfills");

import { h } from "preact";
import habitat from "preact-habitat";

import Banner from "./components/banner";

let _habitat = habitat(Banner);

_habitat.render({
  selector: '[data-widget-host="habitat"]',
  clean: true
});
