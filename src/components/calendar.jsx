import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, getTherapistsCalendarSchedules } from "../store/users";
import { getUser } from "../store/auth";
import { Redirect } from "@reach/router";

const localizer = momentLocalizer(moment);

const SchedulesCalendar = () => {
  const dispatch = useDispatch();
  const therapists = useSelector(getTherapistsCalendarSchedules);
  const user = useSelector(getUser);

  const scheds = therapists
    ? therapists
        .map((therapist) => {
          if (therapist.reservations) {
            return therapist.reservations.map((reservation) => {
              const title = `${therapist.firstName} ${therapist.lastName}`;
              const start = new Date(reservation.date);
              const end = moment(new Date(reservation.date))
                .add(reservation.duration, "m")
                .toDate();
              return {
                title,
                start,
                end,
              };
            });
          }
          return null;
        })
        .flat()
    : [];

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  if (user && user.userType && user.userType.name === "customer")
    return <Redirect to="/" noThrow />;

  return (
    <div className="container mt-3 col-lg-12" style={{ height: "100vh" }}>
      <Calendar
        localizer={localizer}
        events={scheds}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh" }}
      />
    </div>
  );
};

export default SchedulesCalendar;
