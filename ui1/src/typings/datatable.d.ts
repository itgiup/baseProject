import { Node } from "reactflow";

export type FilterState = {
  text: string | JSX.Element;
  value: any;
}[];
export type OptionState = {
  label: string | JSX.Element;
  value: string | boolean | number;
  disabled?: boolean;
}[];
export interface InitalState {
  pagination: {
    current: number;
    pageSize: number;
    pageSizeOptions: number[];
    showSizeChanger: boolean;
    total?: number;
  };
  filters?: {
    keyword?: string;
    [x: string]: any;
  };
  sort?: {
    field?: string;
    order?: string;
  };
  data?: any[];
  loading?: boolean;
  selectedRowKeys: any[];
  updated: number;
}
export interface IAjax {
  field?: string;
  order?: string;
  pageSize: number | string;
  current: number | string;
  searchColumn: ColumnState;
  search?: {
    [key: string]: any;
  };
}
export interface ResponseAjax<TData> {
  success: number;
  data?: TData[];
  recordsTotal?: number;
  recordsFiltered?: number;
  message?: string;
}
export interface AddProps {
  onReload: () => void;
}
export interface ItemProps<T> {
  onReload: () => void;
  item: T;
}
export interface SearchProps {
  setState: React.Dispatch<React.SetStateAction<InitalState>>;
}
export interface ActionProps<T> {
  onReload: () => void;
  ids: string[];
}
export interface ActiveProps<T> {
  setState: React.Dispatch<React.SetStateAction<InitalState>>;
  item: T;
}