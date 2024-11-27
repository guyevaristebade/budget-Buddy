import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Typography,
  Button,
  Row,
  Col,
  Empty,
  Modal,
  Input,
  Spin,
  message,
} from "antd";
import { EditOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { CreateItem, EditItem, Item, RoomStatistics } from "../components";
import {
  getRoom,
  getStatsRoom,
  uploadRoom,
  getItems,
  deleteItem,
} from "../api";
import { useRooms } from "../contexts";
import { ItemDetails } from "../components";
const { Title } = Typography;

export const Room = () => {
  const { _id } = useParams();

  const [room, setRoom] = useState({});
  const [roomStats, setRoomStats] = useState({});
  const [openCreateObj, setOpenCreateObj] = useState(false);
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const { rooms, refreshRooms } = useRooms();
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openItemDetails, setOpenItemDetails] = useState(false);
  const [openEditItem, setOpenEditItem] = useState(false);

  const handleShowEditItem = (item) => {
    setSelectedItem(item);
    setOpenEditItem(true);
  };

  const handleCloseEditItem = () => {
    setOpenEditItem(false);
  };

  const handleShowItemDetails = (item) => {
    setSelectedItem(item);
    setOpenItemDetails(true);
  };

  const handleCloseItemDetails = () => {
    setOpenItemDetails(false);
  };

  const handlerOpen = () => {
    setOpenCreateObj(true);
  };

  const handleClose = (form) => {
    setOpenCreateObj(false);
    form.resetFields();
  };

  const onSubmit = async () => {
    try {
      if (roomName !== undefined && roomName !== "") {
        await uploadRoom(room._id, roomName);
        setRoomName("");

        message.success("La pièce a été modifiée avec succès");

        setOpen(false);
        await refreshRooms();
      } else {
        message.error("Veuillez saisir le nouveau nom de la piece");
      }
    } catch (error) {
      message.error("Une erreur s'est produite");
    }
  };

  const handleOpenEdit = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setRoomName("");
  };

  const fetchItems = async () => {
    try {
      const response = await getItems();
      setProducts(response);
    } catch (error) {
      console.error("Une erreur s'est produite");
    }
  };

  const onItemCreated = () => {
    fetchItems();
  };

  const onItemDeleted = async (itemId) => {
    try {
      const response = await deleteItem(itemId);
      setRoom(response);
      message.success("Item supprimé avec succès");
    } catch (error) {
      message.error("Une erreur s'est produite");
    }
  };

  const fetchData = async () => {
    try {
      const roomResponse = await getRoom(_id);
      setRoom(roomResponse);

      const statsResponse = await getStatsRoom();
      const stats = statsResponse.rooms[roomResponse.name];
      setRoomStats(stats || {});
    } catch (error) {
      message.error("Erreur lors de la récupération des données");
    }
  };

  useEffect(() => {
    fetchData();
    fetchItems();
  }, [_id]);

  if (!room && !roomStats) {
    return <Spin size="large" fullscreen={true} />;
  }

  return (
    <>
      <Flex gap={10} justify="space-between" align="center">
        <Title level={1}>{room && room.name}</Title>
        <Flex gap={10} align="center">
          <Button onClick={handleOpenEdit} icon={<EditOutlined />}>
            Modifier la piece
          </Button>
          <Button icon={<FilterOutlined />}>Trier par prix</Button>
          <Button
            icon={<PlusOutlined />}
            style={{ backgroundColor: "#5C2C6D", color: "#fff" }}
            onClick={handlerOpen}
          >
            Ajouter un objet
          </Button>
        </Flex>
      </Flex>
      <>
        <RoomStatistics roomStats={roomStats} />
      </>
      <>
        {room.items && room.items.length > 0 ? (
          <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
            {room.items.map((item, index) => (
              <Col key={index} span={8}>
                <Item
                  item={item}
                  onItemDeleted={() => onItemDeleted(item._id)}
                  onOpenEditItem={() => handleShowEditItem(item)}
                  onOpenItemDetails={() => handleShowItemDetails(item)}
                />
              </Col>
            ))}

            {selectedItem && (
              <ItemDetails
                item={selectedItem}
                isVisible={openItemDetails}
                onCloseItemModal={handleCloseItemDetails}
              />
            )}

            {selectedItem && (
              <EditItem
                item={selectedItem}
                isVisible={openEditItem}
                onCloseItemModal={handleCloseEditItem}
              />
            )}
          </Row>
        ) : (
          <Empty
            description={`Aucun produit trouvé dans la pièce ${room.name}`}
          />
        )}
      </>

      <CreateItem
        visible={openCreateObj}
        onClose={handleClose}
        onItemCreated={onItemCreated}
      />
      <Modal
        title="Modifier la piece"
        open={open}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Annuler
          </Button>,
          <Button key="submit" type="primary" onClick={onSubmit}>
            Soumettre
          </Button>,
        ]}
      >
        <Input
          placeholder="Entrer le nom"
          onChange={(e) => setRoomName(e.target.value)}
          value={roomName}
        />
      </Modal>
    </>
  );
};
