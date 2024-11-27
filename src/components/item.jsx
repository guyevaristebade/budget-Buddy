import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  Typography,
  Button,
  Popconfirm,
  Flex,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const Item = ({
  item,
  onItemDeleted,
  onOpenEditItem,
  onOpenItemDetails,
}) => {
  const onDeleteItem = async () => {
    onItemDeleted(item._id);
  };

  return (
    <Row style={{ width: "400px", height: "400px" }}>
      <Col xs={24} sm={12} md={12} lg={22}>
        <Card hoverable size="small" bordered={false}>
          <Flex style={{ justifyContent: "flex-end" }}>
            <Button
              style={{
                fontSize: "20px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={onOpenItemDetails}
            >
              <EyeOutlined />
            </Button>
          </Flex>
          <Image
            src={`https://but-3-dev-project-back.onrender.com/api/file/${item.image._id}`}
            alt="Nom du produit"
            style={{
              width: "100%",
              height: "400px",
              marginBottom: "10px",
              backgroundSize: "cover",
            }}
          />
          <Title level={4}>{item.brand}</Title>
          <p>{item.model}</p>
          <p>{item.price} €</p>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Button style={{ width: "100%" }} onClick={onOpenEditItem}>
                <EditOutlined />
              </Button>
            </Col>
            <Col span={12}>
              <Popconfirm
                onConfirm={onDeleteItem}
                onCancel={() => {
                  return;
                }}
                okText="Oui"
                cancelText="Non"
                title="êtes vous sûr ?"
              >
                <Button style={{ width: "100%" }}>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
