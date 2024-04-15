import api from "../../services/user";
import { OptionState } from "../../typings/datatable";

export enum Role {
  ADMIN = 'admin',
  USER = 'user'
}

export const ITEM_NAME = "User";
export const SEARCH_COLUMNS: string[] = ["username"];
export const API = api;
export const ACTIVE: OptionState = [{
  label: "Deactive",
  value: false
}, {
  label: "Active",
  value: true
}]
export interface UserState {
  _id: string,
  username?: string,
  password?: string,
  role: Role,
  createdAt?: Date,
  updatedAt?: Date
}