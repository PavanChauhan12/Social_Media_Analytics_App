import axios from "axios";

const api = axios.create({
  baseURL: __API_BASE_URL__,
  timeout: 10000
});

export default api;

export const fetchSentimentTimeline = async () => {
  const res = await axios.get(`${__API_BASE_URL__}/sentiment/timeline`);
  return res.data;
};

