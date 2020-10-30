import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { setHours, setMinutes, addDays } from "date-fns";

const ReactDatePicker = ({ value, onChange, schedules, disabled }) => {
  const [times, setTimes] = useState([]);
  const [chosenDate, setChosenDate] = useState(new Date());
  const onCalendarOpen = () => {
    setTimes(
      schedules.map((schedule) => {
        let minutes = 0;
        let hours = 0;
        const date = new Date(schedule.date);
        const currentDate = new Date();
        /*
        reserved time should not be disabled when users opened and 
        closed the calendar multiple times without submitting 
        appointment if the chosen date is not equal to the reserved 
        date and current date
         */
        if (
          new Date(chosenDate).getDate() !== date.getDate() &&
          new Date(chosenDate).getDate() !== currentDate.getDate()
        ) {
          return null;
        }

        if (currentDate.getDate() === date.getDate()) {
          console.log("1");
          minutes = date.getMinutes();
          hours = date.getHours();
          return setHours(setMinutes(date, minutes), hours);
        }
        return null;
      })
    );
  };

  // exclude times depending on chosenDate
  const handleTimeChange = (pickedDate) => {
    setTimes(
      schedules.map((schedule) => {
        let minutes = 0;
        let hours = 0;
        const date = new Date(schedule.date);
        if (new Date(pickedDate).getDate() === date.getDate()) {
          minutes = date.getMinutes();
          hours = date.getHours();
          return setHours(setMinutes(date, minutes), hours);
        }
        return null;
      })
    );
  };

  return (
    <DatePicker
      disabled={disabled}
      className="form-control"
      selected={value}
      placeholderText="Select date"
      onCalendarOpen={onCalendarOpen}
      onChange={(e) => {
        onChange(e);
        setChosenDate(e);
        handleTimeChange(e);
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
