import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchDocList, fetchSpecList } from "../api/search.api.mjs";

const useFetchDocs = ({ onError, onSuccess }) => {
  const result = useQuery(["doctor"], fetchDocList);
  return result;
};

const useFetchSpecs = ({ onError, onSuccess }) => {
  const result = useQuery(["specialization"], fetchSpecList);
  return result;
};
export { useFetchDocs, useFetchSpecs };
