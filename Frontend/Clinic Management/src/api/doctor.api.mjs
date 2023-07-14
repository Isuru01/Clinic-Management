import axiosInstance from "./axiosInstance.mjs";

const fetchDoc = async ({ queryKey }) => {
  const result = await axiosInstance().get(`/doctor/${queryKey[1]}`);
  return result.data;
};

const createDoc = async (doctor) => {
  console.log("doc", doctor);
  const result = await axiosInstance().post("/doctor", doctor);
  return result.data;
};

export { fetchDoc, createDoc };
