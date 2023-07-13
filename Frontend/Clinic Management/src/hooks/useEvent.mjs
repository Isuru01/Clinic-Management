import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchEventsByDoc } from "../api/event.api.mjs";

const useFetchDocEvent = ({ onError, onSuccess, session }) => {
  const result = useQuery(["events", session], fetchEventsByDoc, {
    onError,
    onSuccess,
  });

  return result;
};

export { useFetchDocEvent };
