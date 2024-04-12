import React, { useState } from "react";
import { ItemProps } from "@typings/datatable";
import { API, ITEM_NAME, SettingState, TYPES, REQUIRES } from "./constant";
import { message, Button, Form, Input, Modal, Select, Tooltip, InputNumber } from "antd";
import { EditOutlined } from "@ant-design/icons";

const Edit: React.FC<ItemProps<SettingState>> = ({ onReload, item }) => {
  const initialValues = {
    ...item
  }
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>(item.type.toString());
  const [form] = Form.useForm();
  const onSubmit = async (values: SettingState) => {
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
        content: ex?.response?.data?.message || ex?.message || "Đã xảy ra lỗi"
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
                type == "boolean" ? <Select options={[{ label: "True", value: true }, { label: "False", value: false }]} /> :
                  <Input.TextArea rows={5} />
            }
          </Form.Item>
          <Form.Item
            label="Note"
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

export default Edit;