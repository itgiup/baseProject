import React, { useState } from "react";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ItemProps } from "@typings/datatable";
import { API, ITEM_NAME, SettingState } from "./constant";

const Delete: React.FC<ItemProps<SettingState>> = ({ onReload, item }) => {
  const [loading, setLoading] = useState(false);
  const confirm = async () => {
    try {
      setLoading(true);
      await API.deleteItem(item.id);
      message.open({
        type: "success",
        content: `Đã xóa ${ITEM_NAME} thành công`
      });
      onReload();
    } catch (ex) {
      message.open({
        type: "error",
        content: ex?.response?.data?.message || ex?.message || "Đã xảy ra lỗi"
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Popconfirm
        title="Chắc chắn xóa?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button
          danger
          loading={loading}
          icon={<DeleteOutlined />}
        />
      </Popconfirm>
    </>
  );
};

export default Delete;