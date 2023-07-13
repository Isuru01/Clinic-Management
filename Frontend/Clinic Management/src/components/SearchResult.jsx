import React from "react";
import SessionCard from "./cards/SessionCard";
import { Box } from "@mui/material";

const SearchResult = ({ result }) => {
  return (
    <Box
      sx={{
        margin: "auto",
        display: "grid",
        gridTemplateColumns: {
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        },
        gap: 5,
      }}
    >
      {result?.map((doctor) => (
        <SessionCard
          key={doctor.key}
          docID={doctor.key}
          name={doctor.docName}
          available={doctor.available}
          specialization={doctor.docSpecialization.categoryHeader}
        />
      ))}
    </Box>
  );
};

export default SearchResult;
