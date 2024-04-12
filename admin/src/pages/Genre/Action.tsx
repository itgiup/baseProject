import React, { useState } from "react";
import { Button, Modal, message, Space } from "antd";
import { ActionProps } from "@typings/datatable";
import { DeleteOutlined } from "@ant-design/icons";
import { API, ITEM_NAME, GenreState } from "./constant";

const Action: React.FC<ActionProps<GenreState>> = ({ onReload, ids }) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      if (ids && ids.length > 0) {
        let deletePromises = [];
        for (let id of ids) {
          deletePromises.push(API.deleteItem(id));
        }
        const deleteResults = await Promise.allSettled(deletePromises);
        const successfulDeletes = deleteResults.filter(result => result.status === "fulfilled" && result.value.data.success);
        message.open({
          key: "action",
          type: "success",
          content: `Đã xóa thành công ${successfulDeletes.length} ${ITEM_NAME.toLowerCase()}`
        });
        onReload();
      } else {
        message.open({
          key: "action",
          type: "error",
          content: `Không có ${ITEM_NAME.toLowerCase()} nào được chọn để xóa`
        });
      }
    } catch (ex) {
      message.open({
        type: "error",
        content: ex?.response?.data?.message || ex?.message || "Đã xảy ra lỗi"
      });
    } finally {
      setLoading(false);
    }
  }
  const confirm = () => {
    Modal.confirm({
      title: "Bạn có chắc không?",
      content: "Sau khi xóa các mục này, bạn sẽ không thể khôi phục lại. Bạn có muốn tiếp tục?",
      okText: "Xoá",
      cancelText: "Huỷ",
      onOk: handleDelete,
      maskClosable: true,
      okButtonProps: {
        loading
      },
      cancelButtonProps: {
        loading
      }
    });
  }
  return (
    <>
      <Space>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={confirm}
          disabled={(ids?.length) ? false : true}
        >
          Xoá
        </Button>
      </Space>
    </>
  )
};

export default Action;