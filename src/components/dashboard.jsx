import React from "react";
import NavBar from "./common/navBar";

const Dashboard = (props) => {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
};

export default Dashboard;
