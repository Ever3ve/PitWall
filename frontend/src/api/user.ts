import axios from "axios";

const API_URL = "http://localhost:3001/users";

export const getCurrentUser = async () => {
  const token = localStorage.getItem("access-token");
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
