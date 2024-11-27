import axios from "axios";

export const createItem = async (body) => {
  try {
    const formData = new FormData();
    formData.append("room", body.room);
    formData.append("brand", body.brand);
    formData.append("model", body.model);
    formData.append("price", body.price);
    formData.append("purchaseDate", body.purchaseDate);
    formData.append("link", body.link);
    formData.append("description", body.description);
    formData.append("image", body.image);
    formData.append("invoice", body.invoice);

    const response = await axios.post("/item", formData);

    console.log(response.data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getItems = async () => {
  try {
    const response = await axios.get("/item");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getItem = async (_id) => {
  try {
    const response = await axios.get(`/item/${_id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getBrandName = async () => {
  try {
    const response = await axios.get("/item/brands");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const setInvoice = async (_id) => {
  try {
    const response = await axios.post(`/item/${_id}/invoice`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const updateItem = async (_id, bodyRequest) => {
  try {
    const response = await axios.put(`/item/${_id}`, bodyRequest);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteItem = async (_id) => {
  try {
    const response = await axios.delete(`/item/${_id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteInvoice = async (_id) => {
  try {
    const response = await axios.delete(`/item/${_id}/invoice`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
