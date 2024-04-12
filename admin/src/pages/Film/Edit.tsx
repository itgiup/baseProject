import React, { useState } from "react";
import { ItemProps } from "@typings/datatable";
import { API, ITEM_NAME, FilmState } from "./constant";
import { message, Button, Form, Input, Modal, Tooltip, DatePicker } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { log } = console;

const Edit: React.FC<ItemProps<FilmState>> = ({ onReload, item }) => {
  const initialValues = {
    ...item
  }
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const onSubmit = async (values: FilmState) => {
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
            label="title"
            name="title"
            rules={[{ required: true, message: "Thông tin bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="url"
            name="url"
            rules={[{ required: true, message: "Thông tin bắt buộc" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="description"
            name="description"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="duration"
            name="duration"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="releaseDate"
            name="releaseDate"
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="trailer"
            name="trailer"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="poster"
            name="poster"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="thumbnail"
            name="thumbnail"
          >
            <Input />
          </Form.Item>

        </Form>
      </Modal>
    </>
  )
}

export default Edit;