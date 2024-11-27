import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useAuth } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

export const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFinish = (values) => {
    login(values.username, values.password)
      .then(() => {
        message.success("Success de la connexion");
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        message.error("échec de la connexion", error.message);
        console.error("Login failed", error.message);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        <Title style={{ textAlign: "center" }} level={2}>
          Login
        </Title>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ maxWidth: 300 }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
        <Typography>
          Vous n'avez pas de compte ? <Link to="/register">Inscription</Link>
        </Typography>
      </div>
    </div>
  );
};
