import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useAuth } from "../../hooks";
import { Link } from "react-router-dom";

const { Title } = Typography;

export const Register = () => {
  const { register } = useAuth();
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    register(values.username, values.password, values.confirmation)
      .then(() => {
        console.log("Tout est bien fait dans register");
        message.success("Tout est bien fait dans register");
      })
      .catch(() => {
        message.error("Tout est mal fait dans register");
        console.error("Tout est mal fait dans register");
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
          Register
        </Title>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form
          name="register"
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

          <Form.Item
            name="confirmation"
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Register
            </Button>
          </Form.Item>
        </Form>
        <Typography>
          Avez-vous un compte ? <Link to="/login">connexion</Link>
        </Typography>
      </div>
    </div>
  );
};
