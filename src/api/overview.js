import axios from "axios";

export const getRoomStats = async () => {
  try {
    const response = await axios.get("/room/stats");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
