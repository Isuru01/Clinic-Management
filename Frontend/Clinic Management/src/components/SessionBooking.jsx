import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import EventCard from "./cards/EventCard";
import { useFetchDocEvent } from "../hooks/useEvent.mjs";
import { Loader } from "../pages/index";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

//higlight the dates in highlightedDays arra
const ServerDay = (props) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.includes(day.format("YYYY-MM-DD"));

  return (
    <HighlightedDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      onClick={() => setSelected(day)}
      selected={isSelected}
    />
  );
};

const eventCount = 10;

const SessionBooking = ({ doctor }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState();
  const [highlightedDays, setHighlitedDays] = useState([]);

  const { data: eventSet, isLoading } = useFetchDocEvent({
    onSuccess: (message) => {},
    onError: (message) => {},
    session: { id: doctor, today: dayjs().format("YYYY-MM-DD") },
  });

  useEffect(() => {
    if (eventSet) {
      const highlighted = [
        ...new Set(
          eventSet.map(({ start }) => dayjs(start).format("YYYY-MM-DD"))
        ),
      ];

      console.log(highlighted);
      setHighlitedDays(highlighted);
    }
  }, [eventSet]);

  if (isLoading) return <Loader />;

  const filteredEvents = eventSet?.filter(({ start }) =>
    selected ? dayjs(start).isSame(selected, "day") : true
  );

  const pageCount = Math.ceil(filteredEvents?.length / eventCount);

  const events = filteredEvents
    ?.slice((currentPage - 1) * eventCount, currentPage * eventCount)
    .map(({ key, countPatient, start, end, maxPatients }) => (
      <EventCard
        key={key}
        event={key}
        started={start}
        ended={end}
        patients={countPatient}
        max={maxPatients}
      />
    ));

  console.log(pageCount);
  const today = dayjs();

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#000000",
        pt: 4,
        pb: 4,
      }}
    >
      <Box
        sx={{
          display: { md: "grid" },
          gridTemplateColumns: "repeat(2, 1fr)",
          ml: { xs: 2, lg: 5 },
          mr: { xs: 2, lg: 5 },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            sx={{ color: "black" }}
            defaultValue={today}
            minDate={today}
            maxDate={today.add(1, "month")}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              },
            }}
            onChange={(date) => setSelected(date)}
          />
        </LocalizationProvider>

        <Box>
          <Button
            variant="contained"
            sx={{ borderRadius: 0 }}
            onClick={() => setSelected()}
          >
            All
          </Button>

          <Box>{events}</Box>
          <Box sx={{ display: "flex" }}>
            <Button
              fullWidth
              sx={{ borderRadius: 0 }}
              variant="contained"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ borderRadius: 0 }}
              disabled={currentPage === pageCount}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SessionBooking;
