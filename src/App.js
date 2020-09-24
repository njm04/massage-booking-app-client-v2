import React from "react";
import "./App.css";
import Login from "./components/login";
import AppointmentsTable from "./components/appointmentsTable";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <Login /> */}
        <AppointmentsTable />
      </div>
    </Provider>
  );
}

export default App;
