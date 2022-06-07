import axios from "axios";

export default () =>
  axios.create({
    baseURL: "http://localhost:8082/",
  });

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
