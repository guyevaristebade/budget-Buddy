import axios from "axios";

export const createUser = async (username, password, confirmation) => {
  try {
    const response = await axios.post("/user", {
      username,
      password,
      confirmation,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get("/user");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUser = async (_id, bodyRequest) => {
  try {
    const response = await axios.put(`/user/${_id}`, bodyRequest);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteUser = async (_id) => {
  try {
    const response = await axios.delete(`/user/${_id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
