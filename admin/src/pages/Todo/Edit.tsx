import React, { memo, useState } from "react";
import { InitalProps } from "../../typings/datatable";
import { API, ITEM_NAME, State, StateColor, TodoState } from "./constant";
import { message, Button, Form, Input, Modal, Space, Tooltip, Radio, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";

const Edit: React.FC<InitalProps> = (props) => {
  const { onReload, item } = props;
  const initialValues = {
    ...item
  }
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const onSubmit = async (values: TodoState) => {
    try {
      if (API.editItem) {
        setLoading(true);
        const payload = { ...values };
        const response = await API.editItem(item._id, payload);
        if (response.data.success) {
          message.open({
            type: "success",
            content: `Đã sửa ${ITEM_NAME} thành công`,
          });
          setVisible(false);
          if (onReload) onReload();
        } else {
          message.open({
            type: "error",
            content: response.data.message
          });
        }
      }
    } catch (err) {
      console.error(err);
      message.open({
        type: "error",
        content: "Đã xảy ra lỗi"
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
        footer={<div className="right-aligned">
          <Space>
            <Button
              loading={loading}
              htmlType="button"
              onClick={() => setVisible(false)}
            >
              Huỷ
            </Button>
            <Button form="frm-edit" htmlType="submit" type="primary" loading={loading}>
              Lưu
            </Button>
          </Space>
        </div>}
      >
        <Form
          form={form}
          id="frm-edit"
          layout="vertical"
          initialValues={initialValues}
          onFinish={onSubmit}
        >


          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Thông tin bắt buộc" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "Thông tin bắt buộc" }]}
          >
            <Radio.Group>
              {Object.entries(State).map(([key, value]) => (
                <Tag color={StateColor[value]}> <Radio value={value}>{value}</Radio></Tag>
              ))}
            </Radio.Group>
          </Form.Item>


        </Form>
      </Modal>
    </>
  )
}

export default memo(Edit);