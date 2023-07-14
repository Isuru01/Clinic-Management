import React from "react";
import SchoolSharpIcon from "@mui/icons-material/SchoolSharp";
import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Paper,
  CardMedia,
} from "@mui/material";

const QualificationCard = ({ qualification, institute, year }) => {
  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: 0,
        mb: 2,
        maxWidth: "500px",
        borderLeft: "4px solid green",
      }}
    >
      <Box sx={{ p: 2, margin: "auto 0" }}>
        <SchoolSharpIcon fontSize="large" />
      </Box>

      <CardContent>
        <Typography fontSize={"1.2rem"} color={"green"}>
          {qualification}
        </Typography>
        <Typography color="text.secondary">
          {institute} (Year-{year})
        </Typography>
      </CardContent>
    </Card>
  );
};

export default QualificationCard;
