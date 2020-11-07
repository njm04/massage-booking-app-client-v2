import React from "react";
import { FormControl } from "react-bootstrap";

const SearchBox = ({ value, onChange, placeholder }) => {
  return (
    <FormControl
      type="text"
      placeholder={placeholder}
      className="mx-auto my-2 w-50"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBox;
