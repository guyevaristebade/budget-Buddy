import React, { useEffect } from "react";
import { Modal, Button, Form, Input, DatePicker, message } from "antd";
import moment from "moment";
import { InboxOutlined } from "@ant-design/icons";
import { updateItem } from "../api";
import { useParams } from "react-router-dom";
const { TextArea } = Input;

export const EditItem = ({ item, isVisible, onCloseItemModal }) => {
  const [form] = Form.useForm();
  const { _id } = useParams();

  const handleFinish = async (values) => {
    let formattedValues = {
      ...values,
      room: _id,
    };

    if (values.purchaseDate !== undefined) {
      const date = moment(values.purchaseDate.$d).format("YYYY-MM-DD");
      formattedValues = {
        ...values,
        purchaseDate: date,
      };
    }

    try {
      await updateItem(item._id, formattedValues);
      form.resetFields();
      onCloseItemModal();
      message.success("Item mis à jour avec succès");
    } catch (error) {
      message.error("Echec de mise à jour de l'item");
    }
  };

  useEffect(() => {}, []);

  return (
    <Modal
      title="Modifier votre Item"
      open={isVisible}
      onCancel={() => onCloseItemModal(form)}
      footer={[
        <Button key="back" onClick={onCloseItemModal}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item name="brand" label="Marque" initialValue={item.brand}>
          <Input />
        </Form.Item>

        <Form.Item name="model" label="Modèle" initialValue={item.model}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Prix" initialValue={item.price}>
          <Input type="number" />
        </Form.Item>

        <Form.Item name="purchaseDate" label="Date d'achat">
          <DatePicker />
        </Form.Item>
        <Form.Item name="link" label="Lien" initialValue={item.link}>
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          initialValue={item.description}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
