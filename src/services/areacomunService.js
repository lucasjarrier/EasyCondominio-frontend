import http from "./config";

export const getAllAreas = async () => {
  return http().get('/area-comum')
}
