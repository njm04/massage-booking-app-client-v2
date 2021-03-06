import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointmentsTabs from "./components/appointmentsTabs";
import Login from "./components/login";
import PrivateRoute from "./components/common/privateRoute";
import BookAppointmentForm from "./components/bookAppoinmentForm";
import SchedulesCalendar from "./components/calendar";
import Dashboard from "./components/dashboard";
import Registration from "./components/registration";
import CreateUser from "./components/createUser";
import UsersTable from "./components/usersTable";
import EmailConfirmed from "./components/emailConfirmed";
import PageNotFound from "./components/pageNotFound";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Login path="/login" />
        <Registration path="/registration" />
        <EmailConfirmed path="/confirmed" />
        <PrivateRoute as={Dashboard} path="/">
          <PrivateRoute as={AppointmentsTabs} path="/" />
          <PrivateRoute as={BookAppointmentForm} path="/book-appointment" />
          <PrivateRoute as={SchedulesCalendar} path="/calendar" />
          <PrivateRoute as={CreateUser} path="/create-user" />
          <PrivateRoute as={UsersTable} path="/users" />
          <PageNotFound default />
        </PrivateRoute>
      </Router>
    </div>
  );
}

export default App;
