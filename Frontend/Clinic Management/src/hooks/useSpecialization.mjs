import { useQuery } from "@tanstack/react-query";
import { fetchAllSpec } from "../api/specialization.api.mjs";

const useAllSpec = ({ onSuccess, onError }) => {
  const result = useQuery(["specialization"], fetchAllSpec);
  return result;
};

const createSpec = () => {};

export { useAllSpec };
