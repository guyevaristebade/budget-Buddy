import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Button, Flex, Layout } from "antd";
import { Sidebar } from ".";
import { AddPiece } from ".";
import { Profile } from ".";
import { useAuth } from "../hooks";

const { Content, Header, Footer } = Layout;

export const MainLayout = () => {
  const [isAddPieceModalVisible, setIsAddPieceModalVisible] = useState(false);

  const { user } = useAuth();

  const handleAddPieceClick = () => {
    setIsAddPieceModalVisible(true);
  };

  const handleCancelClick = () => {
    setIsAddPieceModalVisible(false);
  };

  useEffect(() => {}, []);

  return (
    <Layout
      style={{
        overflow: "scroll",
      }}
    >
      <Header
        style={{
          color: "#fff",
          height: 60,
        }}
      >
        <Flex
          justify="flex-end"
          align="center"
          gap={10}
          style={{ height: "100%" }}
        >
          {user ? (
            <Profile />
          ) : (
            <Flex gap={10}>
              <Button
                type="primary"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #8757A5",
                  transition: "all 0.5s ease",
                  fontWeight: "bold",
                }}
              >
                <Link to="/login">Se connecter</Link>
              </Button>
              <Button
                type="primary"
                style={{ fontWeight: "bold", background: "#B68CB8" }}
              >
                <Link to="/register">S'inscrire</Link>
              </Button>
            </Flex>
          )}
        </Flex>
      </Header>
      <Flex>
        {user && <Sidebar onAddPieceClick={handleAddPieceClick} />}
        <Content
          style={{
            padding: "1rem",
            overflow: "scroll",
            marginBottom: "2rem",
          }}
        >
          <Outlet />
        </Content>
      </Flex>
      {/*<Footer
          style={{
            textAlign: "center",
          }}
        >
            Copyright &copy; tout droit réserver  Guy BADE x Adem GUETTAF Projet-BUT-3
        </Footer>*/}
      <AddPiece
        open={isAddPieceModalVisible}
        handleCancel={handleCancelClick}
      />
    </Layout>
  );
};
