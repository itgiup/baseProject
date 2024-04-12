import { useEffect, Suspense, useState, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { SITE_NAME, VERSION } from "@configs/index";
import Loading from "@components/Loading";
import { Layout, Drawer, theme, FloatButton, ConfigProvider, Radio, Form, InputNumber, Switch, App } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Aside from "@components/Aside";
import UserHeader from "@components/UserHeader";
import { SettingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { setBorderRadius, setColorPrimary, setIsMobile, toggleDarkMenu } from "@redux/reducers/themeSlice";
import logoSvg from "@assets/logo.svg";
import userService from "@services/user";
import { loginFailed, loginSuccess } from "@redux/reducers/authSlice";

const { Header, Footer, Sider, Content } = Layout;

const ColorRadio = styled(Radio.Group)`
  .ant-radio-inner {
    width: 20px;
    height: 20px;
  }
`;
const AppLayout = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const themeSetting = useAppSelector((state) => state.theme);
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const lightColor = theme.useToken().token;
  const darkColor = theme.darkAlgorithm(theme.defaultSeed);
  const [width, setWidth] = useState(window.innerWidth);
  const handleOpen = () => {
    setOpen(!open);
  }
  const checkLogin = async () => {
    try {
      const response = await userService.isLogin();
      dispatch(loginSuccess({
        user: response.data.data,
        token: auth.token
      }));
    } catch(ex) {
      dispatch(loginFailed(ex?.response?.data?.message || ex.message || "Something went wrong"));
    }
  }
  useLayoutEffect(() => {
    checkLogin();
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth)
    });
    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth)
      });
    }
  }, []);
  useEffect(() => {
    dispatch(setIsMobile(width <= 768));
  }, [width])
  useEffect(() => {
    if (!themeSetting.isMobile) setOpen(false);
  }, [themeSetting.isMobile])
  return (
    <ConfigProvider
      theme={
        {
          algorithm: [
            themeSetting.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
          ],
          token: {
            colorPrimary: themeSetting.colorPrimary,
            borderRadius: themeSetting.borderRadius
          }
        }
      }>
      <App message={{ maxCount: 1 }}>
        <Layout>
          <div className="ant-fake-layout" />
          <Sider
            style={{
              background: themeSetting.isDark ? darkColor.colorBgContainer : themeSetting.isDarkMenu ? "#001529" : lightColor.colorBgContainer,
            }}
            className="ant-sidebar"
            width={220}
          >
            <div className="ant-logo">
              <img alt="logo" src={logoSvg} />
            </div>
            <Aside />
          </Sider>

          <Layout className="site-layout">
            <Header className="ant-fixed-header">
              <div className="ant-header-logo">
                <img src={logoSvg} alt="logo" />
                <h1>{SITE_NAME}</h1>
              </div>
              {!open ? <MenuUnfoldOutlined className="trigger" onClick={handleOpen} /> : <MenuFoldOutlined className="trigger" onClick={handleOpen} />}
              <div className="ant-right-header">
                <UserHeader />
              </div>
            </Header>
            <Drawer
              className="ant-sidebar-mobile"
              style={{
                backgroundColor: themeSetting.isDark ? darkColor.colorBgContainer : themeSetting.isDarkMenu ? "#001529" : lightColor.colorBgContainer,
              }}
              onClose={handleOpen}
              destroyOnClose
              placement="left"
              closable={false}
              open={open}
              width={230}
            >
              <Aside />
            </Drawer>
            <Content>
              <div className="ant-fake-header" />
              <Suspense fallback={<Loading />}>
                <Outlet />
                <FloatButton icon={<SettingOutlined />} onClick={() => setOpenDrawer(true)} />
              </Suspense>
              <Drawer
                open={openDrawer}
                closable={false}
                onClose={() => setOpenDrawer(false)}
                destroyOnClose>
                <Form
                  layout="horizontal"
                  labelCol={{ span: 7 }}
                >
                  <Form.Item label="Color">
                    <ColorRadio
                      defaultValue={themeSetting.colorPrimary}
                      onChange={(e) => {
                        dispatch(setColorPrimary(e.target.value));
                      }}
                    >
                      <Radio className="radio-blue" value="#1677FF" />
                      <Radio className="radio-purple" value="#5A54F9" />
                      <Radio className="radio-magenta" value="#9E339F" />
                      <Radio className="radio-pink" value="#ED4192" />
                      <Radio className="radio-red" value="#E0282E" />
                      <Radio className="radio-orange" value="#F4801A" />
                      <Radio className="radio-yellow" value="#F2BD27" />
                      <Radio className="radio-green" value="#00B96B" />
                    </ColorRadio>
                  </Form.Item>
                  <Form.Item label="Border Radius">
                    <InputNumber
                      min={0}
                      max={10}
                      onChange={(value) => {
                        dispatch(setBorderRadius(value || 0));
                      }}
                      defaultValue={themeSetting.borderRadius}
                    />
                  </Form.Item>
                  <Form.Item label="Dark Menu">
                    <Switch
                      checked={themeSetting.isDarkMenu}
                      onChange={() => {
                        dispatch(toggleDarkMenu());
                      }}
                    />
                  </Form.Item>
                  {/* <Update /> */}
                </Form>
              </Drawer>
            </Content>
            <Footer className="center-aligned">{SITE_NAME} v{VERSION} &copy;{new Date().getFullYear()}</Footer>
          </Layout>
        </Layout>
      </App>
    </ConfigProvider>
  );
}

export default AppLayout;