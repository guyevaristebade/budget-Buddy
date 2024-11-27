import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, DatePicker, Upload, message } from "antd";
import moment from "moment";
import { InboxOutlined } from "@ant-design/icons";
import { createItem } from "../api";
import { useParams } from "react-router-dom";
const { TextArea } = Input;
const { Dragger } = Upload;

export const CreateItem = ({ visible, onClose, onItemCreated }) => {
  const [form] = Form.useForm();
  const { _id } = useParams();

  const handleFinish = async (values) => {
    const date = moment(values.purchaseDate.$d).format("YYYY-MM-DD");

    const formattedValues = {
      ...values,
      purchaseDate: date,
      image: values.image[0].originFileObj,
      invoice: values.invoice[0].originFileObj,
      room: _id,
    };

    try {
      await createItem(formattedValues);
      form.resetFields();
      onClose(form);
      onItemCreated();
      message.success("Item created successfully");
    } catch (error) {
      message.error("Une erreur s'est produite");
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const uploadProps = {
    beforeUpload: () => false,
    maxCount: 1,
    multiple: false,
  };

  return (
    <Modal
      title="Create Object"
      open={visible}
      onCancel={() => onClose(form)}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Image is required!" }]}
        >
          <Dragger {...uploadProps} listType="picture" accept=".jpg,.jpeg,.png">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p>Click or drag file to this area to upload (Image)</p>
          </Dragger>
        </Form.Item>

        <Form.Item
          name="brand"
          label="Marque"
          rules={[{ required: true, message: "Brand is required!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="model"
          label="Modèle"
          rules={[{ required: true, message: "Model is required!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Prix"
          rules={[{ required: true, message: "Price is required!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="purchaseDate"
          label="Date d'achat"
          rules={[{ required: true, message: "Purchase date is required!" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          name="link"
          label="Lien"
          rules={[{ required: true, message: "Link is required!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Description is required!" }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          name="invoice"
          label="Facture"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // rules={[{ required: true, message: "Invoice is required!" }]}
        >
          <Dragger {...uploadProps} accept=".pdf">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p>Click or drag file to this area to upload (PDF)</p>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
};
