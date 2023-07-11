import AxiosInstance from "./axiosInstance.mjs";

const fetchAllSpec = async () => {
  const result = await AxiosInstance().get("/specialization");
  return result.data;
};

export { fetchAllSpec };
