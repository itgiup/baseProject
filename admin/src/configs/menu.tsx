import React from "react";
import type { MenuProps } from "antd";
import { Navigate, RouteObject } from "react-router-dom";
import { APP_PREFIX_PATH } from ".";
import AppLayout from "@pages/AppLayout";
import {
  FaHome,
  FaUser,
  FaCog,
  FaFilm,
  FaRegBookmark
} from "react-icons/fa";
import Dashboard from "@pages/Dashboard";
import Setting from "@pages/Setting";
import User from "@pages/User";
import Film from "@pages/Film";
import Genre from "@pages/Genre";

type MenuItem = Required<MenuProps>["items"][number] & {
  label: string;
  path?: string;
  element?: React.ReactNode;
  index?: boolean;
  children?: MenuItem[];
  isAdmin?: boolean;
  hide?: boolean;
  disabled?: boolean;
};
const menus: MenuItem[] = [
  {
    label: "Trang Chủ",
    key: "",
    path: "/",
    element: <Dashboard />,
    icon: <FaHome />,
  },
  {
    label: "Cài Đặt",
    key: "setting",
    path: "/setting",
    element: <Setting />,
    icon: <FaCog />,
    isAdmin: true,
  },
  {
    label: "User",
    key: "user",
    path: "/user",
    element: <User />,
    icon: <FaUser />,
    isAdmin: true,
  },
  {
    label: "Film",
    key: "film",
    path: "/film",
    element: <Film />,
    icon: <FaFilm />,
    isAdmin: true,
  },
  {
    label: "Genre",
    key: "genre",
    path: "/genre",
    element: <Genre />,
    icon: <FaRegBookmark />,
    isAdmin: true,
  },
];
const toRoutes = (menu: MenuItem[], role: "admin" | "user"): RouteObject[] => {
  return menu
    .filter((item) => {
      if (item.disabled) {
        return false;
      }
      if (role === "user" && item.isAdmin) {
        return false;
      }
      return true;
    })
    .map((item) => {
      const { label, key, isAdmin, hide, ...rest } = item;
      const convertedItem: any = {
        element: rest.element,
        path: rest.path.replace(/^\//, ""),
        index: item.key.toString().includes("item") ? true : false,
        children: rest.children ? toRoutes(rest.children, role) : undefined,
      };

      return convertedItem;
    });
};
const getRoutes = (role: "admin" | "user"): RouteObject[] => {
  let routes: RouteObject[] = toRoutes(menus, role);
  return [
    {
      path: "/",
      element: <Navigate to={APP_PREFIX_PATH} />,
    },
    {
      path: "/login",
      element: <Navigate to={APP_PREFIX_PATH} />,
    },
    {
      path: APP_PREFIX_PATH,
      element: <AppLayout />,
      children: routes,
    },
  ];
};
export { menus, getRoutes };
export default menus;
