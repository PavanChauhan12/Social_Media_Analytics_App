import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000
});

export default api;

export const fetchSentimentTimeline = async () => {
  const res = await axios.get("http://localhost:5000/api/sentiment/timeline");
  return res.data;
};

