import jwtDecode from "jwt-decode";
import http from "./httpService";
import { authReceived } from "../store/auth";

const apiEndpoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export const login = async (email, password) => {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
};

export const loginWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};

export const logout = () => {
  localStorage.removeItem(tokenKey);
  http.setJwt(false);
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
};

// used to set user current user data everytime page refresh if user is already authenticated
export const setCurrentUser = (store) => {
  if (localStorage.token) store.dispatch(authReceived(getCurrentUser()));
};

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  setCurrentUser,
};
