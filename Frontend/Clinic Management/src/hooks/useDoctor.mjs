import { useQuery, useMutation } from "@tanstack/react-query";
import { createDoc, fetchDoc } from "../api/doctor.api.mjs";

const useCreateDoc = ({ onError, onSuccess }) => {
  const mutation = useMutation(createDoc, {
    onError,
    onSuccess,
  });

  return mutation;
};

const useFetchDoc = ({ onError, onSuccess, doctor }) => {
  const result = useQuery(["doctor", doctor], fetchDoc, {
    onError,
    onSuccess,
  });

  return result;
};

export { useCreateDoc, useFetchDoc };
