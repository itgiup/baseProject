import React, { useState } from "react";
import { ItemProps } from "@typings/datatable";
import { API, ITEM_NAME, ROLES, UserState } from "./constant";
import { message, Button, Form, Input, Modal, Select, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";

const Edit: React.FC<ItemProps<UserState>> = ({ onReload, item }) => {
  const initialValues = {
    ...item
  }
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const onSubmit = async (values: UserState) => {
    try {
      setLoading(true);
      await API.editItem(item.id, values);
      message.open({
        type: "success",
        content: `Đã sửa ${ITEM_NAME} thành công`
      });
      setVisible(false);
      onReload();
    } catch (ex) {
      message.open({
        type: "error",
        content: ex?.message || "Đã xảy ra lỗi"
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Tooltip title="Sửa">
        <Button
          onClick={() => setVisible(true)}
          icon={<EditOutlined />}
        >
        </Button>
      </Tooltip>
      <Modal
        title={`Sửa ${ITEM_NAME}`}
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
          id="frm-edit"
          layout="vertical"
          initialValues={initialValues}
          onFinish={onSubmit}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Thông tin bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật Khẩu"
            name="password"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Thông tin bắt buộc" }]}
          >
            <Select options={ROLES} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Edit;