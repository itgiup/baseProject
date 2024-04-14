import axios from "./axios";
import ApiState, { ApiResponse } from "../typings/api";
import { TodoState } from "../pages/Todo/constant";
import { AxiosResponse } from "axios";
const pathApi = "todo";
interface ProxyGroupApiState extends ApiState<TodoState> {
  all: () => Promise<AxiosResponse<ApiResponse<TodoState[]>>>;
}
const api: ProxyGroupApiState = {
  getAll: (data) => {
    const url = `/${pathApi}/ajax`;
    return axios.post(url, data);
  },
  addItem: (data) => {
    const url = `/${pathApi}/add`;
    return axios.post(url, data);
  },
  editItem: (id, data) => {
    const url = `/${pathApi}/edit/${id}`;
    return axios.post(url, data);
  },
  deleteItem: (id) => {
    const url = `/${pathApi}/delete/${id}`;
    return axios.post(url);
  },
  all: () => {
    const url = `/${pathApi}/all`;
    return axios.get(url);
  }
};
export default api;