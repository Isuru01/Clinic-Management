import AxiosInstance from "./axiosInstance.mjs";

const fetchDocList = async () => {
  const result = await AxiosInstance().get("/search/doctor");
  return result.data;
};

export { fetchDocList };
