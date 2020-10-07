import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { Router } from "@reach/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointmentsTable from "./components/appointmentsTable";
import configureStore from "./store/configureStore";
import Login from "./components/login";
import auth from "./services/authService";
import PrivateRoute from "./components/common/privateRoute";
import BookAppointmentForm from "./components/bookAppoinmentForm";
import SchedulesCalendar from "./components/calendar";
import Dashboard from "./components/dashboard";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.css";

const store = configureStore();

auth.setCurrentUser(store);

function App() {
  const user = auth.getCurrentUser();
  console.log(user);
  return (
    <Provider store={store}>
      <div className="App">
        <ToastContainer />
        <Router>
          <Login path="/login" />
          <PrivateRoute as={Dashboard} path="/">
            <PrivateRoute as={AppointmentsTable} path="/appointments" />
            <PrivateRoute as={BookAppointmentForm} path="/book-appointment" />
            <PrivateRoute as={SchedulesCalendar} path="/calendar" />
          </PrivateRoute>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
