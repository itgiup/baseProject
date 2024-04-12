import api from "@services/user";
import { OptionState } from "@typings/datatable";
export const ITEM_NAME = "User";
export const SEARCH_COLUMNS: string[] = ["username"];
export const API = api;
export const ROLES: OptionState = [{
  label: "Admin",
  value: "admin"
}, {
  label: "User",
  value: "user"
}]
export const ACTIVE: OptionState = [{
  label: "Deactive",
  value: false
}, {
  label: "Active",
  value: true
}]
export interface UserState {
  id: string,
  username: string,
  password: string,
  role: "admin" | "member",
  createdAt: Date,
  updatedAt: Date
}