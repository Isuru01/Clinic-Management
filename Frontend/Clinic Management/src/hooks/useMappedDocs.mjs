import React from "react";
import { useFetchDocs } from "./useSearch.mjs";

const useMappedDocs = () => {
  const { isLoading, data } = useFetchDocs({
    onError: (err) => {},
    onSuccess: (message) => {},
  });

  if (isLoading) return { isLoading, doctors: [] };

  const doctors = data.map(({ docName, docSpecialization, key }) => ({
    key: key,
    label: docName,
    specialization: docSpecialization.categoryHeader,
  }));

  return { isLoading, doctors };
};

export default useMappedDocs;
