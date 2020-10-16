import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { setHours, setMinutes, addDays } from "date-fns";

const ReactDatePicker = ({ value, onChange, schedules, disabled }) => {
  const [chosenDate, setChosenDate] = useState("");

  // exclude times depending on chosenDate
  const times = schedules.map((schedule) => {
    let minutes = 0;
    let hours = 0;
    const date = new Date(schedule.date);
    const currentDate = new Date();
    if (new Date(chosenDate).getDate() === date.getDate()) {
      minutes = date.getMinutes();
      hours = date.getHours();
      return setHours(setMinutes(date, minutes), hours);
    }
    if (new Date(chosenDate).getDate() !== date.getDate()) {
      return null;
    }

    if (!chosenDate && currentDate.getDate() === date.getDate()) {
      minutes = date.getMinutes();
      hours = date.getHours();

      return setHours(setMinutes(date, minutes), hours);
    }

    if (!chosenDate) {
      minutes = date.getMinutes();
      hours = date.getHours();

      return setHours(setMinutes(date, minutes), hours);
    }
    return null;
  });

  return (
    <DatePicker
      disabled={disabled}
      className="form-control"
      selected={value}
      placeholderText="Select date"
      onChange={(e) => {
        onChange(e);
        setChosenDate(e);
      }}
      showTimeSelect
      excludeTimes={times}
      minTime={setHours(setMinutes(new Date(), 0), 8)}
      maxTime={setHours(setMinutes(new Date(), 0), 18)}
      dateFormat="MMMM d, yyyy h:mm aa"
      includeDates={[
        new Date(),
        addDays(new Date(), 1),
        addDays(new Date(), 2),
        addDays(new Date(), 3),
        addDays(new Date(), 4),
      ]}
      // timeFormat="HH:mm"
    />
  );
};

export default ReactDatePicker;
