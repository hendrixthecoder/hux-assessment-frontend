import axios from "axios";

// Add cache-control headers to your requests
axios.defaults.headers.common["Cache-Control"] =
  "no-store, no-cache, must-revalidate, proxy-revalidate";
axios.defaults.headers.common["Pragma"] = "no-cache";
axios.defaults.headers.common["Expires"] = "0";

export default axios;
