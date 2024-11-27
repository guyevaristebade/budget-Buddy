import axios from "axios";

export const createRoom = async (name) => {
  try {
    const response = await axios.post("/room", { name });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getRooms = async () => {
  try {
    const response = await axios.get("/room");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getRoom = async (_id) => {
  try {
    const response = await axios.get(`/room/${_id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const uploadRoom = async (_id, name) => {
  try {
    const response = await axios.put(`/room/${_id}`, { name });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getStatsRoom = async () => {
  try {
    const response = await axios.get("/room/stats");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteRoom = async (_id) => {
  try {
    const response = await axios.delete(`/room/${_id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
