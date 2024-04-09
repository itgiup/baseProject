import React, { useEffect, useRef, useState } from 'react';
import { useStore, useStoreDispatch } from "./store/hooks";
import { Col, ConfigProvider, FloatButton, Layout, message, Row, Select, Switch, theme } from 'antd';
import { Outlet, useLocation, } from "react-router-dom";
import i18n from './services/i18n';

import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

import "./App.scss";
import { MainMenu } from './components';
import { loadSettings } from './store/settings';

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

const { Header, Content, Footer, } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;


const App: React.FC = () => {
  const dispatch = useStoreDispatch();
  const settings = useStore((state: { settings: any; }) => state.settings);
  const services = useStore((state: { services: any; }) => state.services);

  const mounted = useRef(false);


  // do componentDidMount logic
  useEffect(() => {
    if (!mounted.current) {
      dispatch(loadSettings())
        .then((payload: any) => {
          if (payload && payload.lang)
            i18n.changeLanguage(payload.lang)
        })
      mounted.current = true;
    }
  }, []);

  useEffect(() => {
    i18n.changeLanguage(settings?.lang)
  }, [settings?.lang])



  const onSelectSymbol = (s: string) => {
    window.location.href = "/pairs/" + s
  }

  return (<ConfigProvider
    theme={{
      algorithm: [
        settings.isDark ? darkAlgorithm : defaultAlgorithm
      ],
      token: {
      }
    }}>

    <Layout>

      <Header>
        <div className="logo"></div>
        <MainMenu />
      </Header>


      <Content style={{ padding: '10px' }}>
        <Outlet />
      </Content>

      <FloatButton.BackTop style={{ bottom: "5px" }} />

      <Footer style={{ textAlign: 'center' }}>
        <Row justify="center" className='footer-row'>
          <Col> ©2024 </Col>
          <Col>
            <a className="menu__link" target="_blank" href="https:///about">@</a> |&nbsp;
            <a className="menu__link" target="_blank" href="https://"></a> </Col>
          <Col>All Rights Reserved</Col>
        </Row>
      </Footer>
    </Layout>
  </ConfigProvider>);
};

export default App;

