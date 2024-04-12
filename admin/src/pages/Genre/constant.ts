import api from "@services/genre";
import { OptionState } from "@typings/datatable";
import { Dayjs } from "dayjs";


export const ITEM_NAME = "Genre";
export const SEARCH_COLUMNS: string[] = ["name"];
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
export interface GenreState {
  id: string,

  name: string,

  createdAt: Date,
  updatedAt: Date
}