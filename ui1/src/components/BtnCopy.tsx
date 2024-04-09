import React, { useState } from "react";
import { Tooltip } from "antd";
import { CopyOutlined, CheckOutlined, } from '@ant-design/icons';
import i18n from "../services/i18n";

type Props = {
    [name: string]: any
    text?: string
    value?: string
}

const BtnCopy: React.FC<Props> = ({ text, value }) => {
    const [icon, seticon] = useState("🤘")
    const { t } = i18n
    const copy = () => {
        // console.log(this.state.icon)
        navigator.clipboard.writeText(value);
        seticon("✔️")
        setTimeout(() => {
            seticon("🤘")
        }, 1500);
    }
    return (<Tooltip title={t(text ? text : "Copy")}>
        <label style={styles.btnCopy} onClick={copy}>
            {icon === "🤘" ? <CopyOutlined /> : <CheckOutlined style={{ color: 'green' }} />}
        </label>
    </Tooltip>)
}


const styles = {
    btnCopy: {
        cursor: "pointer"
    },
    btnChecked: {
        cursor: "pointer", color: "green"
    },
}
export default BtnCopy;