import axios from "axios";
import { getCurrentUser } from "./user/persistUser";
const URL = process.env.URL || 'localhost:5501'
/* Creo una unica instancia de axios que luego uso en todos los servicios. */
const axiosInstance = axios.create({
  baseURL: `${URL}api`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCurrentUser().token; 
  if (token) {
    config.headers["token"] = token;
  }
  
  return config;
});



export default axiosInstance;