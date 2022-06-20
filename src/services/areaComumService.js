import http from "./config";

export const getAllAreas = async () => {
  return http().get("/area-comum");
};

export const deletarAreaById = (idArea) => {
  return http().delete(`/area-comum/${idArea}`);
};

// export const criarAreaComum = async (formArea, file) => {
//   return http().post(
//     `/area-comum?name=${formArea.name}&descript ion=${formArea.description}&tempoPorReserva=${formArea.tempoPorReserva}&operatingTime=${formArea.operatingTime}`,
//     file
//   );
// };

export const criarAreaComum = async (form) => {
  return http().post("/area-comum", form);
};
