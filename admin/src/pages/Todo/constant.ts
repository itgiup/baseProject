import api from "../../services/todo";
export const ITEM_NAME = "Todo";
export const SEARCH_COLUMNS: string[] = ["name", "description"];
export const API = api;

export enum State {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export const StateColor: { [state: string]: string } = {
  [State.PENDING]: 'warning',
  [State.SUCCESS]: 'success',
  [State.FAILED]: 'error',
}

export interface TodoState {
  _id?: string,
  content: string,
  state: State,
}