import axios from "axios";

const setupAxios = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  axios.defaults.withCredentials = true;
};

export default setupAxios;
