import React from "react";
import dayjs from "dayjs";
import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event, started, ended, day, patients, max }) => {
  const navigate = useNavigate();

  const date = dayjs(started).format("DD,MMM: YYYY");
  const start = dayjs(started).format("hh:mm A");
  const end = dayjs(ended).format("hh:mm A");

  const handleClick = () => {
    navigate(`/pay/${event}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderRadius: 0,
        mb: 0.5,
      }}
    >
      <CardContent>
        <Typography variant="h5">{date}</Typography>
        <Typography variant="body1" color="text.secondary">
          start at {start} to {end}
        </Typography>
      </CardContent>

      <Box
        sx={{
          ml: "auto",
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#Ffa31a",
          color: "#ffff",
          borderRadius: 0,
        }}
      >
        <Typography>Available No</Typography>
        <Typography>{patients}</Typography>
      </Box>

      <CardActions sx={{ p: 0 }}>
        <Button
          variant="contained"
          sx={{
            height: "100%",
            backgroundColor: "blue",
            color: "#ffff",
            borderRadius: 0,
          }}
          onClick={handleClick}
        >
          Reserve
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
