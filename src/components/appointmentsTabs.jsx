import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import AppointmentsTable from "./appointmentsTable";
import AppointmentsHistory from "./appointmentsHistory";

const AppointmentsTabs = () => {
  const [key, setKey] = useState("current");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="current" title="Current">
        <AppointmentsTable />
      </Tab>
      <Tab eventKey="history" title="History">
        <AppointmentsHistory />
      </Tab>
    </Tabs>
  );
};

export default AppointmentsTabs;
