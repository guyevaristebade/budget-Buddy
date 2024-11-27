import React from "react";
import { Modal, Button, Image, Typography, Divider, Flex } from "antd";
import { Link } from "react-router-dom";
import { LinkOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
export const ItemDetails = ({ item, isVisible, onCloseItemModal }) => {
  console.log(item);
  return (
    <>
      <Modal
        title={<Title>{item.brand}</Title>}
        open={isVisible}
        onCancel={onCloseItemModal}
        footer={[
          <Button key="link" href={item.link} target="_blank" type="primary">
            Retrouvez l'article
          </Button>,
        ]}
      >
        <Divider />
        <div>
          <Image
            width={200}
            src={`https://but-3-dev-project-back.onrender.com/api/file/${item.image._id}`}
            alt={item.model}
            preview={false}
          />
          <Flex style={{ flexDirection: "column" }}>
            <Paragraph>Modèle : {item.model}</Paragraph>

            <Paragraph>Prix : {item.price} €</Paragraph>

            <Paragraph>
              Date d'achat : {new Date(item.purchaseDate).toLocaleDateString()}
            </Paragraph>
          </Flex>
          <Flex style={{ flexDirection: "column" }}>
            <Paragraph>Description</Paragraph>
            <Paragraph>{item.description}</Paragraph>
          </Flex>
          <Button type="primary" icon={<LinkOutlined />}>
            <Link
              to={`https://but-3-dev-project-back.onrender.com/api/file/${item.invoice._id}`}
              target="_blank"
            >
              Voir la facture
            </Link>
          </Button>
        </div>
      </Modal>
    </>
  );
};
