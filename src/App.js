import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { Router, Link } from "@reach/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointmentsTable from "./components/appointmentsTable";
import configureStore from "./store/configureStore";
import Login from "./components/login";
import auth from "./services/authService";
import PrivateRoute from "./components/common/privateRoute";
import BookAppointmentForm from "./components/bookAppoinmentForm";
import NavBar from "./components/common/navBar";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
const store = configureStore();

auth.setCurrentUser(store);

function App() {
  const user = auth.getCurrentUser();

  return (
    <Provider store={store}>
      <div className="App">
        <ToastContainer />
        <NavBar />
        <Router>
          <Login path="/" />
          <PrivateRoute as={AppointmentsTable} path="/dashboard" user={user} />
          <PrivateRoute as={BookAppointmentForm} path="/book-appointment" />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
