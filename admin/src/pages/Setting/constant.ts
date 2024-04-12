import api from "@services/setting";
import { OptionState } from "@typings/datatable";
export const ITEM_NAME = "Cài Đặt";
export const SEARCH_COLUMNS: string[] = ["key", "content", "note"];
export const API = api;
export const TYPES: OptionState = [{
  label: "String",
  value: "string"
}, {
  label: "Number",
  value: "number"
}, {
  label: "Boolean",
  value: "boolean"
}, {
  label: "Array",
  value: "array"
}, {
  label: "JSON",
  value: "json"
}]
export const ACTIVES: OptionState = [{
  label: "Deactive",
  value: "false"
}, {
  label: "Active",
  value: "true"
}]
export const REQUIRES: OptionState = [{
  label: "Deactive",
  value: false
}, {
  label: "Active",
  value: true
}]
export interface SettingState {
  id: string,
  key: string,
  content: string,
  note?: string,
  type: "string" | "number" | "boolean" | "array" | "json",
  required: boolean
}