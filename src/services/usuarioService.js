import http from "./config";

export const cadastrarUsuario = async (formulario) => {
  return http().post('/user', formulario)
}

export const getUserByToken = async (token) => {
  return http().get('/user/getUserByToken', token)
}
