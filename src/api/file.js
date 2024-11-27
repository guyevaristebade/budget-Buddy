import axios from "axios";

export const createFile = async (body) => {
  try {
    const response = await axios.post("/file", body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getFile = async (_id) => {
  try {
    const response = await axios.get(`/file/${_id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
