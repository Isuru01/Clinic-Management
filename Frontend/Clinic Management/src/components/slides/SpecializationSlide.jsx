import React from "react";
import { Box } from "@mui/material";
import SpecializationFrom from "../forms/SpecializationFrom";
import SpecializationTable from "../tables/SpecializationTable";

const SpecializationSlide = ({ action }) => {
  return (
    <Box
      sx={{
        p: 2,
        margin: "auto",
        backgroundColor: "#fffff",
        minHeight: "100vh",
      }}
    >
      {action === "create" && <SpecializationFrom />}
      {!action && <SpecializationTable />}
    </Box>
  );
};

export default SpecializationSlide;
