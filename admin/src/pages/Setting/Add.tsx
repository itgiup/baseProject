import React, { useState } from "react";
import { AddProps } from "@typings/datatable";
import { API, ITEM_NAME, SettingState, TYPES, ACTIVES, REQUIRES } from "./constant";
import { message, Button, Form, Input, Modal, Select, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Add: React.FC<AddProps> = ({ onReload }) => {
  const initialValues = {
    type: TYPES[0].value,
    required: REQUIRES[0].value
  }
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>(TYPES[0].value.toString());
  const [form] = Form.useForm();
  const onSubmit = async (values: SettingState) => {
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
            label="Key"
            name="key"
            rules={[{ required: true, message: "Thông tin bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nội Dung"
            name="content"
          >
            {
              type == "number" ? <InputNumber style={{ width: "100%" }} /> :
                type == "boolean" ? <Select options={ACTIVES} /> :
                  <Input.TextArea rows={5} />
            }
          </Form.Item>
          <Form.Item
            label="Mô Tả"
            name="note"
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item
            label="Loại"
            name="type"
            rules={[{ required: true, message: "Thông tin bắt buộc" }]}
          >
            <Select onChange={(value) => setType(value)} options={TYPES} />
          </Form.Item>
          <Form.Item
            label="Required"
            name="required"
            tooltip="Bắt buộc phải có"
            rules={[{ required: true, message: "Thông tin bắt buộc" }]}
          >
            <Select options={REQUIRES} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Add;