import React from "react";
import { Box } from "@mui/material";
import DoctorForm from "../forms/DoctorForm";
import DoctorTable from "../tables/DoctorTable";

const DoctorSlide = ({ action }) => {
  return (
    <Box
      sx={{
        p: 2,
        margin: "auto",
        backgroundColor: "#fffff",
        minHeight: "100vh",
      }}
    >
      {action === "create" && <DoctorForm />}
      {!action && <DoctorTable />}
    </Box>
  );
};

export default DoctorSlide;
