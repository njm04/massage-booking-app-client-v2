import React, { useState } from "react";
import DatePicker from "react-datepicker";

const BirthDatePicker = ({ value, onChange }) => {
  // const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      className="form-control"
      placeholderText="Select birthdate"
      selected={value}
      onChange={(e) => {
        onChange(e);
      }}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      yearDropdownItemNumber={2}
      dropdownMode="select"
      dateFormat="MMMM d, yyyy"
    />
  );
};

export default BirthDatePicker;
