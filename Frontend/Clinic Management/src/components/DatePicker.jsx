import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const DatePicker = ({ fn, selected }) => {
  const handleDayOfWeekChange = (event, days) => {
    fn(days);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={selected}
      onChange={handleDayOfWeekChange}
      aria-label="Weekdays"
    >
      <ToggleButton value="mon">Mon</ToggleButton>
      <ToggleButton value="tue">Tue</ToggleButton>
      <ToggleButton value="wed">Wed</ToggleButton>
      <ToggleButton value="thu">Thu</ToggleButton>
      <ToggleButton value="fri">Fri</ToggleButton>
      <ToggleButton value="sat">Sat</ToggleButton>
      <ToggleButton value="sun">Sun</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default DatePicker;
