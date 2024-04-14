import api from "../../services/cookie";
export const ITEM_NAME = "Cards";
export const SEARCH_COLUMNS: string[] = ["ip", "country", "uid"];
export const API = api;

export enum State {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface TodoState {
  _id?: string,
  content: string;
  state: State
  createdAt?: Date,
  updatedAt?: Date,
}