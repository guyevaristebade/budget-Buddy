import React from "react";
import {
  Col,
  Row,
  Typography,
  Card,
  Input,
  Button,
  Popconfirm,
  message,
  Form,
} from "antd";
import { updateUser, deleteUser } from "../api";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/index.js";
const { Title } = Typography;

export const UserSettings = () => {
  const { user } = useAuth();
  const { updateUsername } = useUser();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await updateUser(user.user._id, values);
      message.success("User updated successfully");
      await updateUsername();
    } catch (error) {
      message.error(error.message);
    }
  };

  const onDeleteUser = async () => {
    try {
      await deleteUser(user.user._id);
      message.success("User deleted successfully");
      navigate("/register");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <Title>Paramètres Utilisateur</Title>

      <Row gutter={[12, 12]}>
        <Col span={12}>
          <Title level={3}>Mettre à jour les informations</Title>
          <Card>
            <Form onFinish={onFinish}>
              <Form.Item rules={[{ required: true }]} name="username">
                <Input type="text" placeholder="username" name="username" />
              </Form.Item>
              <Form.Item rules={[{ required: true }]} name="password">
                <Input.Password
                  type="text"
                  placeholder="password"
                  name="password"
                />
              </Form.Item>
              <Form.Item rules={[{ required: true }]} name="confirmation">
                <Input.Password
                  type="text"
                  placeholder="confirmation"
                  name="confirmation"
                />
              </Form.Item>
              <Form.Item rules={[{ required: true }]} name="old_password">
                <Input.Password
                  type="text"
                  placeholder="old_password"
                  name="old_password"
                />
              </Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                style={{ width: "100%" }}
              >
                Effectuer les changements
              </Button>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Title level={3}>Suppression du compte</Title>
          <Popconfirm
            title="Tu es sûr de ton choix ? Fait BELEK mon reuf !!!!"
            onConfirm={onDeleteUser}
          >
            <Button type="primary" danger>
              Supprimer son compte
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    </div>
  );
};
