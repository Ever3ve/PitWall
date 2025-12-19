import axios from "axios";

const API_URL = "http://localhost:3001/favorite-drivers";

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
