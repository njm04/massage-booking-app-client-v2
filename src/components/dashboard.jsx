import React from "react";
import NavBar from "./common/navBar";

const Dashboard = (props) => {
  console.log(props.children);
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
};

export default Dashboard;
