import { useState } from "react";
import useMappedDocs from "../../hooks/useMappedDocs.mjs";
import DatePicker from "../DatePicker";
import dayjs from "dayjs";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useCreateSession } from "../../hooks/useSession.mjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { useFetchDocs } from "../../hooks/useSearch.mjs";

const SessionForm = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [session, setSession] = useState({
    specialization: "Specialization",
    doctor: "",
    note: "",
  });
  const [fee, setFee] = useState({});
  const [schedule, setSchedule] = useState({});

  const hanldeSchedule = (day, name, value) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [name]: value,
      },
    }));
  };

  const handleFee = (e) => {
    const { name, valueAsNumber } = e.target;
    setFee((prev) => ({
      ...prev,
      [name]: valueAsNumber,
    }));
  };

  const mutation = useCreateSession({
    onError: (err) => {},
    onSuccess: (message) => {},
  });

  const planDays = selectedDays.map((day) => (
    <Box>
      <Typography variant="h6" sx={{ textAlign: "left", mb: 2 }}>
        {day}
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="start at"
            defaultValue={dayjs()}
            format="HH:mm"
            views={["hours", "minutes"]}
            onChange={(time) =>
              hanldeSchedule(day, "startedAt", time.format("HH:mm"))
            }
            ampm={false}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="end at"
            disabled
            format="HH:mm"
            views={["hours", "minutes"]}
            ampm={false}
          />
        </LocalizationProvider>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="minutes per patient"
            defaultValue={dayjs()}
            views={["minutes"]}
            format="mm"
            onChange={(minute) =>
              hanldeSchedule(day, "sessionTime", minute.format("mm"))
            }
            ampm={false}
          />
        </LocalizationProvider>

        <TextField
          type="number"
          name="sessionRoom"
          label="room no"
          onChange={(e) =>
            hanldeSchedule(day, e.target.name, e.target.valueAsNumber)
          }
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          name="maxPatients"
          type="number"
          label="max patients"
          onChange={(e) =>
            hanldeSchedule(day, e.target.name, e.target.valueAsNumber)
          }
        />
      </Box>
    </Box>
  ));

  const { isLoading: docLoading, doctors } = useMappedDocs();

  if (docLoading) return <div>Loading</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutation.mutateAsync({ ...session, schedule, fee });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Autocomplete
            disablePortal
            fullWidth
            onChange={(event, doctor) =>
              setSession((prev) => ({
                ...prev,
                specialization: doctor?.specialization,
                doctor: doctor?.key,
              }))
            }
            options={doctors}
            renderInput={(params) => <TextField {...params} label="Doctor" />}
          />

          <TextField
            disabled
            fullWidth
            value={session.specialization}
            name="specialization"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            type="number"
            fullWidth
            name="consultation"
            label="consultation"
            onChange={handleFee}
          />
          <TextField
            type="number"
            fullWidth
            name="service"
            label="service"
            onChange={handleFee}
          />
          <TextField
            type="number"
            fullWidth
            name="tax"
            label="tax"
            onChange={handleFee}
          />
        </Box>

        <TextField
          name="notes"
          label="notes"
          fullWidth
          value={session.note}
          multiline
          onChange={(e) =>
            setSession((prev) => ({ ...prev, note: e.target.value }))
          }
          rows={6}
        />

        <DatePicker fn={setSelectedDays} selected={selectedDays} />

        {planDays}

        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </form>
  );
};

export default SessionForm;
