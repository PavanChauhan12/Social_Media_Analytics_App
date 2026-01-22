import axios from "axios";

export const fetchTimeline = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/sentiment/timeline");

    console.log("TIMELINE API RESPONSE:", res.data);

    if (res.data.success) {
      setTimelineData(res.data.timeline);
    }
  } catch (error) {
    console.error("Timeline fetch error:", error);
  }
};
