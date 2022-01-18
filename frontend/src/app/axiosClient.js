import axios from "axios";

/* Creo una unica instancia de axios que luego uso en todos los servicios. */
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5501/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers["token"] = token;
  }
  
  return config;
});

export default axiosInstance;