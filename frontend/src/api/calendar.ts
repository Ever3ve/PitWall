import axios from "axios";

const API_URL = "http://localhost:3001/sessions";

export const getCalendar = async (year: number) => {
  return axios.get(`${API_URL}/year/${year}`);
};
