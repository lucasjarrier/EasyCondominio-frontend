import http from "./config";

export const getReservasByIdArea = async (idArea) => {
  return http().get(`/reserva/${idArea}`);
};

export const cancelarReservasById = async (idArea) => {
  return http().put(`/reserva/${idArea}`);
};

export const fazerReservasById = async (idArea) => {
  return http().put(`/reserva/fazer-reserva/${idArea}`);
};
