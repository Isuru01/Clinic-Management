import { useFetchDocs, useFetchSpecs } from "../hooks/useSearch.mjs";

const getDocList = () => {
  const { isLoading, data } = useFetchDocs({
    onError: (err) => {},
    onSuccess: (message) => {},
  });

  console.log(data);

  if (isLoading) return undefined;
  else return data;
};

export default getDocList;
