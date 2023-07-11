import AxiosInstance from "./axiosInstance.mjs";

const createSession = async (session) => {
  const result = await AxiosInstance().post("/session", session);
  return result.data;
};

export { createSession };
