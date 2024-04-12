import api from "@services/film";
import { OptionState } from "@typings/datatable";
import { Dayjs } from "dayjs";


export const ITEM_NAME = "Film";
export const SEARCH_COLUMNS: string[] = ["title"];
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
export interface FilmState {
  id: string,

  title: string,
  description: string,
  duration: number,
  releaseDate: Dayjs,
  trailer: string,
  poster: string,
  thumbnail: string,
  url: string,

  createdAt: Date,
  updatedAt: Date
}