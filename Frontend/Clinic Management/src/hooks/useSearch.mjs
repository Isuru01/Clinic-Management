import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchDocList,
  fetchSpecList,
  searchQuery,
} from "../api/search.api.mjs";

const useFetchDocs = ({ onError, onSuccess }) => {
  const result = useQuery(["doctor"], fetchDocList, {
    onError,
    onSuccess,
  });
  return result;
};

const useFetchSpecs = ({ onError, onSuccess }) => {
  const result = useQuery(["specialization"], fetchSpecList, {
    onError,
    onSuccess,
  });
  return result;
};

const useSearch = ({ onError, onSuccess, query, isClicked }) => {
  const result = useQuery(["search", query], searchQuery, {
    enabled: isClicked,
    onError,
    onSuccess,
  });
  return result;
};
export { useFetchDocs, useFetchSpecs, useSearch };
