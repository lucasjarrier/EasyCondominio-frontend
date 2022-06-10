import http from "./config";

export const cadastrarAviso = async (formulario) => {
  return http().post("/announcement", formulario);
};

export const getAllAvisos = async () => {
  return http().get("/announcement");
};

export const deletarAvisoById = (idAviso) => {
  return http().delete(`/announcement/${idAviso}`);
};
