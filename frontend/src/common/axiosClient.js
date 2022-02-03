import axios from "axios";
import { getCurrentUser } from "./user/persistUser";

/* Creo una unica instancia de axios que luego uso en todos los servicios. */
const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.8:5501/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCurrentUser().token; 
  if (token) {
    config.headers["token"] = token;
  }
  
  return config;
});



export default axiosInstance;