import React from "react";
import { Chip } from "@mui/material";

const DaysChip = ({ days }) => {
  return (
    <>
      {days.map((day) => (
        <Chip sx={{ mr: "6px", mb: "6px" }} label={day} />
      ))}
    </>
  );
};

export default DaysChip;
