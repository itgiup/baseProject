import axios from "./axios";
import { API_PREFIX } from "@configs/index";
import ApiState, { ApiResponse } from "@typings/api";
import { SettingState } from "@pages/Setting/constant";
import { AxiosResponse } from "axios";
const pathApi = "setting";
interface SettingApiState extends ApiState<SettingState> {
  getItem: (key: string) => Promise<AxiosResponse<ApiResponse<any>>>;
}
const api: SettingApiState = {
  getAll: (data) => {
    const url = `/${API_PREFIX}/${pathApi}/ajax`;
    return axios.post(url, data);
  },
  addItem: (data) => {
    const url = `/${API_PREFIX}/${pathApi}/add`;
    return axios.post(url, data);
  },
  editItem: (id, data) => {
    const url = `/${API_PREFIX}/${pathApi}/edit/${id}`;
    return axios.post(url, data);
  },
  deleteItem: (id) => {
    const url = `/${API_PREFIX}/${pathApi}/delete/${id}`;
    return axios.post(url);
  },
  getItem: (key) => {
    const url = `/${API_PREFIX}/${pathApi}/get/${key}`;
    return axios.get(url);
  },
};
export default api;