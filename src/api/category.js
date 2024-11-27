import axios from "axios";

export const getCategory = async () => {
  try {
    const response = await axios.get("/category");
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};
