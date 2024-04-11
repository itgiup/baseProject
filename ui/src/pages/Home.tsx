import React, { useEffect, useRef, useState } from 'react';
import { useStoreDispatch, useStore } from "../store/hooks";
import type { MenuProps, } from 'antd';
import { AlertOutlined, GlobalOutlined, } from '@ant-design/icons';

import i18n from '../services/i18n';
import { change, loadSettings, } from '../store/settings';
import WalletConnectButton from '../components/WalletConnectButton';


const { log, error, warn } = console




type Props = {
    [name: string]: any
    text?: string
}


const Home: React.FC<Props> = () => {
    const dispatch = useStoreDispatch();
    const settings = useStore((state) => state.settings);
    const mounted = useRef(false);

    useEffect(() => {
        // do componentDidMount logic
        if (!mounted.current) {

        }
        mounted.current = true;
    }, []);


    return (<>
        Home

        <WalletConnectButton />
    </>);
};

export default Home;
