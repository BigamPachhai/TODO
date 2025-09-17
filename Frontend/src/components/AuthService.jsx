import axios from "axios";

axios.defaults.withCredentials = true;

const API="http://localhost:3000/api/auth";


export const signup = (data) => axios.post(`${API}/signup`, data);
export const login = (data) => axios.post(`${API}/login`, data);
export const logout = () => axios.post(`${API}/logout`);
export const getUser = () => axios.get(`${API}/me`);