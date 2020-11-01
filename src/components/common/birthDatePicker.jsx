import React from "react";
import DatePicker from "react-datepicker";

const BirthDatePicker = ({ value, onChange }) => {
  return (
    <DatePicker
      className="form-control"
      placeholderText="Select birthdate"
      selected={value}
      onChangeRaw={(e) => e.preventDefault()}
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
