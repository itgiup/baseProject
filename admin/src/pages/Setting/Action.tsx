import React, { useState } from "react";
import { Button, Modal, message, Space, Form, Select } from "antd";
import { ActionProps } from "@typings/datatable";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { API, ITEM_NAME, SettingState, REQUIRES, TYPES } from "./constant";

const Action: React.FC<ActionProps<SettingState>> = ({ onReload, ids }) => {
  const initialValues = {

  }
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
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
        content: ex?.message || "Đã xảy ra lỗi"
      });
    } finally {
      setLoading(false);
    }
  }
  const onSubmit = async (values: SettingState) => {
    try {
      setLoading(true);
      if (ids && ids.length > 0) {
        let editPromises = [];
        for (let id of ids) {
          editPromises.push(API.editItem(id, values));
        }
        const editResults = await Promise.allSettled(editPromises);
        const successfulEdits = editResults.filter(result => result.status === "fulfilled" && result.value.data.success);
        message.open({
          key: "action",
          type: "success",
          content: `Đã sửa thành công ${successfulEdits.length} ${ITEM_NAME.toLowerCase()}`
        });
        setVisible(false);
        form.resetFields();
        onReload();
      } else {
        message.open({
          key: "action",
          type: "error",
          content: `Không có ${ITEM_NAME.toLowerCase()} nào được chọn để sửa`
        });
      }
    } catch (err) {
      console.error(err);
      message.open({
        key: "action",
        type: "error",
        content: "Đã xảy ra lỗi"
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
          icon={<FormOutlined />}
          onClick={() => setVisible(true)}
          disabled={(ids?.length) ? false : true}
        >
          Sửa
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={confirm}
          disabled={(ids?.length) ? false : true}
        >
          Xoá
        </Button>
      </Space>
      <Modal
        title={`Sửa hàng loạt ${ITEM_NAME}`}
        open={visible}
        onCancel={() => setVisible(false)}
        destroyOnClose
        okText="Lưu"
        cancelText="Huỷ"
        onOk={() => form.submit()}
        okButtonProps={{
          loading
        }}
        cancelButtonProps={{
          loading
        }}
      >
        <Form
          form={form}
          id="frm-action"
          layout="vertical"
          initialValues={initialValues}
          onFinish={onSubmit}
        >
          <Form.Item
            label="Loại"
            name="type"
          >
            <Select options={TYPES} allowClear />
          </Form.Item>
          <Form.Item
            label="Required"
            name="required"
            tooltip="Bắt buộc phải có"
          >
            <Select options={REQUIRES} allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
};

export default Action;