import axios from "./axios";
import { API_PREFIX } from "@configs/index";
import ApiState, { ApiResponse } from "@typings/api";
import { UserState } from "@pages/User/constant";
import { AxiosResponse } from "axios";
import { API_BASE_URL } from "@configs/index";
const pathApi = "user";
interface UserApiState extends ApiState<UserState> {
  assignProfile: (id: string, data: any) => Promise<AxiosResponse<ApiResponse<any>>>;
  all: () => Promise<AxiosResponse<ApiResponse<UserState[]>>>;
  isLogin: () => Promise<AxiosResponse<ApiResponse<any>>>;
}
const api: UserApiState = {
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
  all: () => {
    const url = `/${API_PREFIX}/${pathApi}/all`;
    return axios.get(url);
  },
  assignProfile: (id, data) => {
    const url = `/${API_PREFIX}/${pathApi}/assign/${id}`;
    return axios.post(url, data);
  },
  isLogin: () => {
    const url = `/ajax/isLogin`;
    return axios({
      baseURL: API_BASE_URL,
      url,
      method: "GET",
    })
  },
};
export default api;