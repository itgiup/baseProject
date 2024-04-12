import React, { useState } from "react";
import { AddProps } from "@typings/datatable";
import { API, ITEM_NAME, GenreState } from "./constant";
import { message, Button, Form, Input, Modal, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { log } = console;

const Add: React.FC<AddProps> = ({ onReload }) => {
  const initialValues = {}

  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const onSubmit = async (values: GenreState) => {
    log(values)
    try {
      setLoading(true);
      await API.addItem(values);
      message.open({
        type: "success",
        content: `Đã thêm ${ITEM_NAME} thành công`
      });
      setVisible(false);
      form.resetFields();
      onReload();
    } catch (ex) {
      message.open({
        type: "error",
        content: ex?.response?.data?.message || ex?.message || "Đã xảy ra lỗi"
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        onClick={() => setVisible(true)}
        type="primary"
        icon={<PlusOutlined />}
      >
        Thêm mới
      </Button>
      <Modal
        title={`Thêm ${ITEM_NAME}`}
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
          id="frm-add"
          layout="vertical"
          initialValues={initialValues}
          onFinish={onSubmit}
        >
          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: "Thông tin bắt buộc" }]}
          >
            <Input />
          </Form.Item>

        </Form>
      </Modal>
    </>
  )
}

export default Add;