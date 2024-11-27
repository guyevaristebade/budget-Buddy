import moment from "moment";
import { getRooms } from "../api";

export const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const updateRooms = async () => {
  try {
    await getRooms();
  } catch (error) {
    console.error(error.message);
  }
};
