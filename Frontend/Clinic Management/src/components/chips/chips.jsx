import React from "react";
import { Chip } from "@mui/material";

const chips = ({ days }) => {
  return (
    <>
      {days.map((day) => (
        <Chip label={day} />
      ))}
    </>
  );
};

export default chips;
