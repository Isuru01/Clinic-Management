import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import bgv1 from "../../../public/bgv1.jpg";
import DaysChip from "../chips/DaysChip";
import { useNavigate } from "react-router-dom";

const SessionCard = ({ docID, name, specialization, available }) => {
  const naviagate = useNavigate();

  const handleClick = () => {
    const params = new URLSearchParams({ name, specialization });
    naviagate(`/appoinment/${docID}?=${params}`);
  };

  return (
    <Card
      sx={{
        maxWidth: "auto",
        maxHeight: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia sx={{ height: 60 }} image={bgv1} title="green iguana" />
      <Avatar
        sx={{
          bgcolor: "blue",
          position: "relative",
          top: "-15px",
          left: "20px",
        }}
      >
        {name.slice(0, 1)}
      </Avatar>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Dr. {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {specialization}
        </Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <DaysChip days={available} />
      </CardContent>
      <CardActions sx={{ marginTop: "auto" }}>
        <Button
          sx={{ marginLeft: "auto", marginTop: "auto", fontWeight: "600" }}
          size="medium"
          variant="outlined"
          onClick={() => handleClick()}
        >
          Appoinment
        </Button>
      </CardActions>
    </Card>
  );
};

export default SessionCard;
