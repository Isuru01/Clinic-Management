import AxiosInstance from "./axiosInstance.mjs";

const fetchDocList = async () => {
  const result = await AxiosInstance().get("/search/doctor");
  return result.data;
};

const fetchSpecList = async () => {
  const result = await AxiosInstance().get("/search/specialization");
  return result.data;
};

export { fetchDocList, fetchSpecList };
