import axios from "axios";
import AxiosInstance from "./axiosInstance.mjs";

const fetchEventsByDoc = async ({ queryKey }) => {
  const result = await AxiosInstance().get(`/event/bydoc/${queryKey[1].id}`, {
    timeout: 5000,
  });
  return result.data;
};

export { fetchEventsByDoc };
