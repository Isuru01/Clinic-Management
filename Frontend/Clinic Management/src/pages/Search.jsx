import React from "react";
import { Box, Autocomplete, TextField } from "@mui/material";
import SessionCard from "../components/cards/SessionCard";
import doctors from "../utils/doc.search.mjs";
import { useFetchDocs, useFetchSpecs } from "../hooks/useSearch.mjs";

const specialization = [];

console.log(doctors);

const Search = () => {
  const { isLoading: docLoading, data: docList } = useFetchDocs({
    onError: (err) => {},
    onSuccess: (message) => {},
  });

  const { isLoading: specLoading, data: specList } = useFetchSpecs({
    onError: (err) => {},
    onSuccess: (message) => {},
  });

  if (docLoading && specLoading) return <div>Loading</div>;

  console.log(specList, docList);
  return (
    <Box sx={{ backgroundColor: "#ffff" }}>
      <Box>
        <Box sx={{ md: { display: "-moz-initial" }, lg: { display: "flex" } }}>
          <Autocomplete
            options={doctors}
            renderInput={(params) => <TextField {...params} label="Doctor" />}
          />
          <Autocomplete
            options={specialization}
            renderInput={(params) => (
              <TextField {...params} label="Specialization" />
            )}
          />
        </Box>

        <SessionCard />
      </Box>
    </Box>
  );
};

export default Search;
