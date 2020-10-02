import React from "react";
import DatePicker from "react-datepicker";
import { setHours, setMinutes, addDays } from "date-fns";

const ReactDatePicker = ({ value, onChange }) => {
  return (
    <DatePicker
      className="form-control"
      selected={value}
      placeholderText="Select date"
      onChange={(e) => onChange(e)}
      includeDates={[
        new Date(),
        addDays(new Date(), 1),
        addDays(new Date(), 2),
        addDays(new Date(), 3),
        addDays(new Date(), 4),
      ]}
      showTimeSelect
      timeFormat="HH:mm"
      injectTimes={[
        setHours(setMinutes(new Date(), 1), 0),
        setHours(setMinutes(new Date(), 5), 12),
        setHours(setMinutes(new Date(), 59), 23),
      ]}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

export default ReactDatePicker;
