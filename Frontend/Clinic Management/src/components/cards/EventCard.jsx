import React from "react";
import dayjs from "dayjs";
import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
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
    <Card sx={{ display: "flex", justifyContent: "space-between" }}>
      <CardContent>
        <Typography variant="h4">{date}</Typography>
        <Typography variant="body1" color="text.secondary">
          start at {start} to {end}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 0 }}>
        <Button
          variant="contained"
          sx={{
            height: "100%",
            width: "100px",
            backgroundColor: "#Ffa31a",
            color: "#ffff",
            borderRadius: 0,
          }}
        >
          Reserve
        </Button>
        <Button
          variant="contained"
          sx={{
            height: "100%",
            width: "100px",
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
