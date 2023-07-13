import { useState } from "react";
import SearchResult from "../components/searchResult";
import { Box, Autocomplete, TextField, Button } from "@mui/material";
import SessionCard from "../components/cards/SessionCard";
import useMappedDocs from "../hooks/useMappedDocs.mjs";
import useMappedSpecs from "../hooks/useMappedSpecs.mjs";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../hooks/useSearch.mjs";

const specialization = [];

const Search = () => {
  const naviagate = useNavigate();
  const [click, setClick] = useState(false);
  const [search, setSearch] = useState({
    doctor: "",
    specialization: "",
  });

  const params = new URLSearchParams(search);
  const queryString = params.toString();

  const { isLoading: docLoading, doctors } = useMappedDocs();
  const { isLoading: specLoading, specializations } = useMappedSpecs();
  const { isLoading: searchLoading, data: searchResult } = useSearch({
    onError: (error) => {},
    onSuccess: (data) => {
      setClick(false);
    },
    query: queryString,
    isClicked: click,
  });

  console.log(searchResult);

  if (specLoading || docLoading) return <div>Loading...</div>;

  const handleSearch = () => {
    naviagate(`/search?=${queryString}`);
    setClick(true);
  };

  console.log(click);
  return (
    <Box sx={{ backgroundColor: "#ffff" }}>
      <Box>
        <Box>
          <Box
            sx={{
              display: { md: "flex" },
              gap: { md: 2 },
              p: { md: 10, sm: 4 },
            }}
          >
            <Autocomplete
              fullWidth
              options={doctors}
              value={search.doctor}
              onChange={(event, doc) => {
                setSearch((prev) => ({
                  ...prev,
                  doctor: doc?.label,
                  specialization: doc?.specialization,
                }));
              }}
              renderInput={(params) => <TextField {...params} label="Doctor" />}
            />

            <Autocomplete
              fullWidth
              value={search.specialization}
              options={specializations}
              onChange={(event, spec) => {
                setSearch((prev) => ({
                  ...prev,
                  specialization: spec?.label,
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Specialization" />
              )}
            />

            <Button
              onClick={handleSearch}
              sx={{ minWidth: "120px" }}
              variant="contained"
            >
              Search
            </Button>
          </Box>
        </Box>

        <SearchResult result={searchResult} />
      </Box>
    </Box>
  );
};

export default Search;
