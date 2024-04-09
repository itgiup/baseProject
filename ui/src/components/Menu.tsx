import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStoreDispatch, useStore } from "../store/hooks";
import { Switch, type MenuProps, Menu } from 'antd';
import { AlertOutlined, GlobalOutlined, LineChartOutlined, DeleteOutlined, ReloadOutlined, ThunderboltOutlined, BuildOutlined } from '@ant-design/icons';
import { toggleDark } from '../store/settings';

import i18n from '../services/i18n';
import { change, loadSettings, } from '../store/settings';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import '@rainbow-me/rainbowkit/styles.css';

const { log, error, warn } = console

type Props = {
    [name: string]: any
    text?: string
}


const MainMenu: React.FC<Props> = () => {
    const dispatch = useStoreDispatch();
    const { t } = i18n
    const settings = useStore((state) => state.settings);
    const mounted = useRef(false);
    const [current, setCurrent] = useState('/');
    const location = useLocation();

    useEffect(() => {
        // do componentDidMount logic
        if (!mounted.current) {
            // dispatch(loadSettings()).then((payload: any) => {
            //     if (payload && payload.lang)
            //         i18n.changeLanguage(payload.lang)
            // })
            // setCurrent(location.pathname.slice(1))
        }
        mounted.current = true;
    }, []);

    const changeTheme = () => {
        dispatch(toggleDark());
    };

    const onClickMenu: MenuProps['onClick'] = (e) => {
        if (e.key.startsWith("settings")) {
            let [key, value] = e.key.split(":")
            key = key.replace("settings.", "")
            dispatch(change({ [key]: value }))

        } else if (e.key === "clean") {

        } else if (e.key === "wallet") {

        } else if (e.key === "reset") {

        }

        else if (e.key === "theme") { }
        else if (e.key === "reload") { document.location.reload() }

        else {
            setCurrent(e.key);
            document.location.href = "/" + e.key
        }
    };

    return (<>
        <Menu
            onClick={onClickMenu} selectedKeys={[current]}
            mode="horizontal"
            items={[
                {
                    label: <a href='/'></a>,
                    key: '',
                    icon: <img src='/favicon.ico' style={{ width: "38px" }} />,// <HomeOutlined />,
                },
                {
                    label: (<ConnectButton />),
                    key: 'wallet',
                },
                /** app functions */
                {
                    label: "",
                    key: 'reload',
                    icon: <ReloadOutlined />,
                },
                {
                    label: t("Reset app"),
                    icon: <DeleteOutlined />,
                    key: 'reset',
                },
                {
                    label: t(settings.lang),
                    key: 'lang',
                    icon: <GlobalOutlined />,
                    children: [
                        {
                            label: 'English',
                            key: 'settings.lang:en',
                        },
                        {
                            label: 'Việt Nam',
                            key: 'settings.lang:vi',
                        },
                    ]
                },
                {
                    label: (
                        <Switch
                            checked={settings.isDark}
                            onChange={changeTheme}
                            checkedChildren="☀️"
                            unCheckedChildren="🌙"
                        />
                    ),
                    key: 'theme',
                },
            ]} />
    </>);
};

export default MainMenu;
