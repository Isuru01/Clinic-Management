import { useQuery, useMutation } from "@tanstack/react-query";
import { createSession } from "../api/session.api.mjs";

const useCreateSession = ({ onError, onSuccess }) => {
  const mutation = useMutation(createSession, {
    onError,
    onSuccess,
  });

  return mutation;
};

export { useCreateSession };
