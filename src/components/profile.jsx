import React from "react";
import { Avatar, Dropdown, Flex, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/index.js";

export const Profile = () => {
  const { logout } = useAuth();
  const { username } = useUser();

  const menuItems = [
    { key: "edit", label: <Link to="user-settings">Modifier le profile</Link> },
    {
      key: "delete",
      label: <Link to="user-settings">Supprimer le profile</Link>,
    },
    { key: "logout", label: "Déconnexion" },
  ];

  const handlerClick = (e) => {
    switch (e.key) {
      case "logout":
        logout();
        break;
      default:
        break;
    }
  };

  const menu = <Menu onClick={handlerClick} items={menuItems} />;

  return (
    <div>
      <Dropdown placement="bottomRight" overlay={menu} trigger={["click"]}>
        <Flex align="center" gap={10}>
          Bonjour, {username}
          <Avatar size={40} icon={<UserOutlined />} />
        </Flex>
      </Dropdown>
    </div>
  );
};
