import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useRooms } from "../contexts";
//import { getRooms } from "../api/index.js";

export const Sidebar = () => {
  const [item, setItem] = useState([]);
  const { rooms, refreshRooms } = useRooms();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  useEffect(() => {
    const children =
      rooms && rooms.length > 0
        ? rooms.map(({ name, _id }) =>
            getItem(
              <Link
                to={`room/${encodeURIComponent(_id)}`}
                style={{ color: "white" }}
              >
                {name}
              </Link>,
              _id,
              null,
              null,
              null,
            ),
          )
        : [];

    const items = [
      getItem(
        <Link to="/overview" style={{ color: "white" }}>
          Vue d'ensemble
        </Link>,
        "overview",
        <AppstoreOutlined style={{ color: "white" }} />,
      ),
      children.length > 0
        ? getItem(
            "Pièces",
            "piece",
            <HomeOutlined style={{ color: "white" }} />,
            children,
          )
        : null,
      getItem(
        <Link style={{ color: "white" }} to="/settings">
          Paramètres pièces
        </Link>,
        "settings",
        <SettingOutlined style={{ color: "white" }} />,
        null,
        null,
      ),
      getItem(
        <Link style={{ color: "white" }} to="/user-settings">
          Paramètres utilisateurs
        </Link>,
        "user-settings",
        <SolutionOutlined style={{ color: "white" }} />,
        null,
        null,
      ),
    ];

    setItem(items);
  }, [rooms]);

  useEffect(() => {
    refreshRooms();
  }, []);

  return (
    <Menu
      style={{
        width: 250,
        minHeight: "100vh",
      }}
      mode="inline"
      items={item}
      theme="dark"
    />
  );
};
