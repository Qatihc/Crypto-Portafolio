import axios from "axios";

/* Creo una unica instancia de axios que luego uso en todos los servicios. */
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5501/api',
});


export default axiosInstance;