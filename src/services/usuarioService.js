import http from "./config";

export const cadastrarUsuario = async (formulario) => {
  return http().post('/user', formulario)
}
