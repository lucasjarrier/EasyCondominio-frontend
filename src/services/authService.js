import http from "./config";

export const login = async (body) => {
  return http().post('/login', body)
}

export const logout = async () => {
  return http().get('/login/logout')
}