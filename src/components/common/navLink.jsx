import React from "react";
import { Link } from "@reach/router";

const NavLink = (props) => {
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        return {
          style: {
            color: isCurrent ? "white" : "rgba(255, 255, 255, 0.5)",
          },
        };
      }}
    />
  );
};

export default NavLink;
