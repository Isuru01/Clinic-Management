import React from "react";
import { Box } from "@mui/material";
import DoctorInfo from "../components/DoctorInfo";
import { useParams } from "react-router-dom";
import SessionBooking from "../components/SessionBooking";

const Appoinment = () => {
  const { doctor } = useParams();

  return (
    <Box>
      <DoctorInfo doctor={doctor} />
      <SessionBooking doctor={doctor} />
    </Box>
  );
};

export default Appoinment;
