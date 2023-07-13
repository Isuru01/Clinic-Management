import React from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import SessionBooking from "../components/SessionBooking";

const Appoinment = () => {
  const { doctor } = useParams();

  return (
    <Box>
      <Box></Box>
      <Box>
        <SessionBooking doctor={doctor} />
      </Box>
    </Box>
  );
};

export default Appoinment;
