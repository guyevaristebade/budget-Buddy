import axios from "axios";

export const isLoggedIn = async () => {
  try {
    const response = await axios.get("/authenticate");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post("/authenticate", { username, password });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const logout = async () => {
  try {
    const response = await axios.delete("/authenticate");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
