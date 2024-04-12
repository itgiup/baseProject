import type { MenuProps } from "antd";
import { Menu } from "antd";
import menus from "@configs/menu";
import { useNavigate, useLocation } from "react-router-dom";
import { getUrl } from "@utils";
import { useAppSelector } from "@redux/hooks";
import { Scrollbars } from "react-custom-scrollbars-2";
import { cloneDeep } from "lodash";

const checkUrl = (pathUrl: string): {
	openKeys?: string[];
	selectKey: string;
} => {
	const splitUrl = pathUrl.split("/").slice(2);
	let keys = "";
	const openKeys = [];
	let selectKey = "";
	let filters = [];
	for(let i=0;i<splitUrl.length;i++) {
		const key = splitUrl[i];
		if (i === 0) keys += `${key}`;
		else keys += `_${key}`;
		openKeys.push(keys);
		filters = filters.length === 0 ? menus.filter((item) => item.key === keys) : filters?.[0]?.children.filter((item) => item.key === keys);
		const isChildren = filters.filter((item) => item.children);
		if (isChildren.length === 0) {
			selectKey = keys;
			break;
		} else {
			selectKey = `${keys}_item`;
		}
	}
	if (selectKey === "automation_script_editor") selectKey = "automation_script_item";
	if (selectKey === "automation_task_editor") selectKey = "automation_task_item";
	return {
		openKeys,
		selectKey: selectKey
	}
}
const removeHiddenItems = (arr: any) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const item = arr[i];
    delete item.isAdmin;
    if (item.hide === true) {
      arr.splice(i, 1);
    } else if (item.children && item.children.length > 0) {
      item.children = removeHiddenItems(item.children);
      if (item.children.length === 0) {
        arr.splice(i, 1);
      }
    }
  }
  return arr;
}

const filterMenus = (menus: any[], role: "admin" | "user") => {
	const filters = role === "user" ? menus.filter((item) => !item.isAdmin) : menus;
	return removeHiddenItems(filters);
}
const Aside = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { user } = useAppSelector((state) => state.auth);
	const onClick: MenuProps["onClick"] = (e) => {
		navigate(getUrl(e.key));
	};
	const themeSetting = useAppSelector((state) => state.theme);
	const infoUrl = checkUrl(location.pathname);
	let hookMenu = cloneDeep(menus);
	hookMenu = filterMenus(hookMenu, user.role);
	return (
		<Scrollbars style={{ height: "100vh" }}>
			<Menu
				theme={themeSetting.isDarkMenu && !themeSetting.isDark ? "dark" : "light"}
				onClick={onClick}
				defaultSelectedKeys={[infoUrl.selectKey]}
				defaultOpenKeys={infoUrl?.openKeys ? infoUrl?.openKeys : undefined}
				mode="inline"
				items={hookMenu}
				style={{ borderRight: 0 }}
			/>
		</Scrollbars>
	);
};

export default Aside;