import { useQuery, useMutation } from "@tanstack/react-query";
import { createDoc } from "../api/doctor.api.mjs";

const useCreateDoc = ({ onError, onSuccess }) => {
  const mutation = useMutation(createDoc, {
    onError,
    onSuccess,
  });

  return mutation;
};

export { useCreateDoc };
