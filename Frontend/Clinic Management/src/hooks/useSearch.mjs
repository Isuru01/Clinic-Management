import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchDocList } from "../api/search.api.mjs";

const useFetchDocs = ({ onError, onSuccess }) => {
  const result = useQuery(["doctors"], fetchDocList);

  return result;
};

export { useFetchDocs };
