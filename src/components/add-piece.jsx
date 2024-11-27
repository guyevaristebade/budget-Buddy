import React, { useState } from "react";
import { Input, Modal, message } from "antd";
import { createRoom } from "../api";

export const AddPiece = ({ open, handleCancel }) => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleOk = (e) => {
    e.preventDefault();
    if (name === undefined || name === "") {
      message.error("Invalid veuillez remplir le champs");
      return;
    }

    createRoom(name)
      .then(() => {
        console.log("Room created", name);
      })
      .catch(() => {
        console.error("Failed to create room", name);
      });
    setName("");
    handleCancel();
  };

  return (
    <div>
      <Modal
        title="Ajouter une piece"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={name}
          placeholder="Entrez le nom de la piece"
          onChange={handleChange}
        />
      </Modal>
    </div>
  );
};
