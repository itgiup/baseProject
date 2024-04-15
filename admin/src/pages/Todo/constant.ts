import api from "../../services/todo";
export const ITEM_NAME = "Todo";
export const SEARCH_COLUMNS: string[] = ["name", "description"];
export const API = api;
export interface TodoState {
  _id?: string,
  name?: string,
  url?: string,
  token?: string,
  timeout?: number,
  timeout2?: number,
  Task?: number
}