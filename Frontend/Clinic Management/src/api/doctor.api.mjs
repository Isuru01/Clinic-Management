import axiosInstance from "./axiosInstance.mjs";

const fetchDoc = async () => {
  const result = await axiosInstance(BA);
};

const createDoc = async (doctor) => {
  console.log("doc", doctor);
  const result = await axiosInstance().post("/doctor", doctor);
};

export { fetchDoc, createDoc };
