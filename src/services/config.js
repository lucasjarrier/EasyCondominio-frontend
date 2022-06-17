import axios from "axios";

export default () =>
  axios.create({
    baseURL: "http://localhost:8082/",
    headers: {
      "Content-type": "application/json",
      // "Content-Type":
      //   "multipart/form-data; boundary=---011000010111000001101001'",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
