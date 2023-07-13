import React from "react";
import { useFetchSpecs } from "./useSearch.mjs";

const useMappedSpecs = () => {
  const { isLoading, data } = useFetchSpecs({
    onError: (err) => {},
    onSuccess: (message) => {},
  });

  if (isLoading) return { isLoading, specializations: [] };

  const specializations = data.map(({ categoryHeader }, index) => ({
    label: categoryHeader,
  }));

  return { isLoading, specializations };
};

export default useMappedSpecs;
