import React, { useState } from "react";
import {
  Col,
  Row,
  Typography,
  Card,
  Flex,
  Table,
  Input,
  Button,
  Popconfirm,
  message,
  Form,
} from "antd";
import { deleteRoom } from "../api";
import { DeleteOutlined } from "@ant-design/icons";
import { createRoom } from "../api";
import { useRooms } from "../contexts";
const { Title } = Typography;

export const RoomSettings = () => {
  const [name, setName] = useState("");
  const { rooms, refreshRooms } = useRooms();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleOk = async (e) => {
    try {
      e.preventDefault();
      if (name === undefined || name === "") {
        message.error("Invalid veuillez remplir le champs");
        return;
      }
      await createRoom(name);
      message.success(`La pièce ${name} a bien été crée`);
      await refreshRooms();
      setName("");
    } catch (error) {
      message.error("Error creating room: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRoom(id);
      message.success("Pièce supprimée avec succès");
      await refreshRooms();
    } catch (error) {
      console.error(error.message);
      message.error("Erreur lors de la suppression de la pièce");
    }
  };

  const columns = [
    {
      title: "Nom de la pièce",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Êtes-vous sûr de vouloir supprimer cette pièce ?"
          onConfirm={() => handleDelete(record._id)}
          okText="Oui"
          cancelText="Non"
        >
          <Button type="danger">
            <DeleteOutlined style={{ color: "red" }} />{" "}
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Title>Paramètres des Pièces</Title>

      <Row gutter={[12, 12]}>
        <Col span={12}>
          <Title level={3}>Ajouter une pièce</Title>
          <Card>
            <Form>
              <Form.Item>
                <Flex gap={5}>
                  <Input
                    value={name}
                    placeholder="Entrez le nom de votre piece "
                    onChange={handleChange}
                  />
                  <Button htmlType="submit" type="primary" onClick={handleOk}>
                    Créer
                  </Button>
                </Flex>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Title level={3}>Liste des pièces</Title>
          <Table columns={columns} dataSource={rooms && rooms} rowKey="_id" />
        </Col>
      </Row>
    </div>
  );
};
