import React from "react";
import type { MenuProps } from "antd";
import { Navigate, RouteObject } from "react-router-dom";
import { APP_PREFIX_PATH, AUTH_PATH } from ".";
import AppLayout from "../pages/AppLayout";
import {
  FaHome,
  FaUser,
  FaChrome,
} from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import Dashboard from "../pages/Dashboard";
import Todo from "../pages/Todo";
import User from "../pages/User";
import ClientAppToken from "../pages/ClientAppToken";

type MenuItem = Required<MenuProps>["items"][number] & {
  path?: string,
  element?: React.ReactNode,
  index?: boolean,
  children?: MenuItem[]
};

const menus: MenuItem[] = [{
  label: "Trang Chủ",
  key: "",
  path: "/",
  element: <Dashboard />,
  icon: <FaHome />
}, {
  label: "Todo",
  key: "todo",
  path: "/todo",
  icon: <LuListTodo />,
  children: [{
    label: "Todo",
    key: "todo_item",
    path: "/",
    element: <Todo />,
    icon: <LuListTodo />
  }]
}, {
  label: "Client App Token",
  key: "clientapptoken",
  path: "/clientapptoken",
  element: <ClientAppToken />,
  icon: <FaChrome />
}, {
  label: "User",
  key: "user",
  path: "/user",
  element: <User />,
  icon: <FaUser />
}];

const getRoutes = (): RouteObject[] => {
  let routes: RouteObject[] = [];
  for (let item of menus) {
    let children: RouteObject[] = [];
    if (item.children) {
      for (let child of item.children) {
        children.push({
          element: child.element,
          path: child.path?.replace(/\//gm, ""),
          index: child.key?.toString().endsWith("_item")
        });
      }
    }
    if (children.length > 0) {
      routes.push({
        path: item.path?.replace(/\//gm, ""),
        children
      });
    } else {
      routes.push({
        path: item.path?.replace(/\//gm, ""),
        element: item.element
      });
    }
  }
  return [{
    path: "/*",
    element: <Navigate to={APP_PREFIX_PATH} />
  }, {
    path: AUTH_PATH,
    element: <Navigate to={APP_PREFIX_PATH} />
  }, {
    path: APP_PREFIX_PATH,
    element: <AppLayout />,
    children: routes
  }]
}

export {
  menus,
  getRoutes
}
export default menus;