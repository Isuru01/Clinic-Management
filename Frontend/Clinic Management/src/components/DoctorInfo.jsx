import React from "react";
import bgv1 from "../../public/bgv1.jpg";
import { Avatar, Box, CardMedia, Divider, Typography } from "@mui/material";
import { useFetchDoc } from "../hooks/useDoctor.mjs";
import DaysChip from "./chips/DaysChip";
import QualificationCard from "./cards/QualificationCard";

const DoctorInfo = ({ doctor }) => {
  const { isLoading, data } = useFetchDoc({
    onError: () => {},
    onSuccess: () => {},
    doctor,
  });

  if (isLoading) return <div>Loading</div>;

  const {
    available,
    docName,
    docGender,
    docHospital,
    docLiscense,
    docProfilePic,
    docQualification,
    description,
    docSpecialization,
    docActiveYears,
  } = data;

  console.log(docQualification);
  const qualifications = docQualification.map(
    ({ qualification, institute, year }) => (
      <QualificationCard
        qualification={qualification}
        institute={institute}
        year={year}
      />
    )
  );

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#000000",
        mb: 2,
        pb: 2,
      }}
    >
      <CardMedia sx={{ height: 140 }} image={bgv1} title="green iguana" />

      <Avatar
        sx={{
          bgcolor: "blue",
          position: "relative",
          width: "80px",
          height: "80px",
          top: "-40px",
          left: "80px",
        }}
      >
        {docName.slice(0, 1)}
      </Avatar>

      <Box sx={{ ml: { xs: 2, lg: 5 }, mr: { xs: 2, lg: 5 }, mt: -2 }}>
        <Typography variant="h1" fontSize={"2.6rem"}>
          Dr.{docName}
        </Typography>

        <Typography fontSize={"1.6rem"} mb={4} color="text.secondary">
          {docSpecialization.categoryHeader}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Box
            sx={{
              display: { md: "flex" },
              justifyContent: "space-between",
              maxWidth: "1000px",
            }}
          >
            <Box>
              <Typography fontSize={"1.2rem"} color={"green"}>
                Primary Hospital
              </Typography>
              <Typography color="text.secondary">{docHospital}</Typography>
            </Box>

            <Box>
              <Typography fontSize={"1.2rem"} color={"green"}>
                Medical Liscense
              </Typography>
              <Typography color="text.secondary">{docLiscense}</Typography>
            </Box>

            <Box>
              <Typography fontSize={"1.2rem"} color={"green"}>
                Years Of Experience
              </Typography>
              <Typography color="text.secondary">{docActiveYears}</Typography>
            </Box>
          </Box>

          <Divider />

          <Box>
            <Typography mb={1} fontSize={"1.2rem"} color={"green"}>
              Available On
            </Typography>
            <DaysChip days={available} />
          </Box>

          <Divider />

          <Box>
            <Typography fontSize={"1.2rem"} color={"green"}>
              Description
            </Typography>
            <Typography color="text.secondary">
              {description ? description : "N/A"}
            </Typography>
          </Box>

          <Box>{qualifications}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorInfo;
