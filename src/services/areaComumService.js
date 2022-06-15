import http from "./config";

export const getAllAreas = async () => {
  return http().get("/area-comum");
};

export const deletarAreaById = (idArea) => {
  return http().delete(`/area-comum/${idArea}`);
};

export const criarAreaComum = async (formArea) => {
  return http().post("/area-comum", formArea);
};
