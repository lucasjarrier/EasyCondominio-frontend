import axios from "axios";

export default () =>
  axios.create({
    baseURL: "http://localhost:8080/", //Ambiente Dev
    // baseURL: "https://easy-condominio-backend.herokuapp.com/",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
