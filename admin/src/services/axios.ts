import axios from "axios";
import { API_BASE_URL } from "@configs/index";
import store from "@redux/store";
import { loginFailed } from "@redux/reducers/authSlice";
const axiosAuthInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "content-type": "application/json"
  },
});
axiosAuthInstance.interceptors.request.use(async (config: any) => {
  const jwtToken = store.getState().auth.token;
  if (jwtToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${jwtToken}`,
    }
  }
  return config;
});
axiosAuthInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    store.dispatch(loginFailed(error?.response?.data?.message || error));
  }
  return Promise.reject(error);
});
export default axiosAuthInstance;