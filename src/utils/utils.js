import React from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { Button, Badge } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import states from "../canadian-states.json";
import Tooltip from "../components/common/tooltip";

export const concatName = (item) => {
  return `${item.firstName} ${item.lastName}`;
};

export const concatAddress = (obj) => {
  const addressTwo = obj.addressTwo ? obj.addressTwo + " " : "";
  return `${addressTwo}${obj.address}, ${obj.city}, ${obj.state}, ${obj.zip}`;
};

export const toastMessage = (obj, action) => {
  if (action === "accountCreated") {
    if (
      obj.userType.name === "customer" &&
      obj.createdBy.userType.name === "customer"
    ) {
      toast.success(
        "Account successfully created. A verification message has been sent to your email address"
      );
    } else {
      toast.success(
        `${obj.userType.name.toUpperCase()} account successfully created.`
      );
    }
  }

  if (action === "appointmentDeleted") {
    if (obj.userType.name === "customer") {
      toast.success("Appointment has been cancelled");
    } else {
      toast.success("Appointment has been deleted successfully");
    }
  }
};

export const getCities = (abbreviation) => {
  const provAbbreviation = !abbreviation ? "AB" : abbreviation;
  return _.find(states, ["abbreviation", provAbbreviation]).cities;
};

export const handleChangeSchedules = (
  therapistId,
  therapists,
  setTherapistSched
) => {
  const therapist = therapists.find(
    (therapist) => therapist._id === therapistId
  );

  const schedules = therapist.reservations.map((schedule) => ({
    date: schedule.date,
    duration: schedule.duration,
  }));

  setTherapistSched(schedules);
};

export const createDefaultValues = (user, data = null) => {
  if (user && user.userType) {
    if (data && user.userType.name === "admin") {
      return {
        firstName: data.customer.firstName,
        lastName: data.customer.lastName,
        email: data.customer.email,
        address: data.address,
        addressTwo: data.addressTwo,
        state: data.state,
        city: data.city,
        zip: data.zip,
        duration: data.duration,
        date: new Date(data.date),
        contactNumber: data.contactNumber,
        massageType: data.massageType,
        therapist: data.therapist._id,
      };
    } else if (data && user.userType.name !== "admin") {
      return {
        firstName: data.customer.firstName,
        lastName: data.customer.lastName,
        email: data.customer.email,
        address: data.address,
        addressTwo: data.addressTwo,
        state: data.state,
        city: data.city,
        zip: data.zip,
        duration: data.duration,
        date: new Date(data.date),
        contactNumber: data.contactNumber,
        massageType: data.massageType,
        therapist: data.therapist._id,
      };
    } else if (user.userType.name === "admin") {
      return {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        addressTwo: "",
        state: "AB",
        city: "Banff",
        zip: "",
        duration: 60,
        date: null,
        contactNumber: "",
        massageType: "Whole body massage",
        therapist: "",
      };
    } else {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        address: "",
        addressTwo: "",
        state: "AB",
        city: "Banff",
        zip: "",
        duration: 60,
        date: null,
        contactNumber: "",
        massageType: "Whole body massage",
        therapist: "",
      };
    }
  } else {
    return {};
  }
};

export const createColumns = (user, handleShow = null, handleDelete = null) => {
  if (user && user.userType) {
    if (user.userType.name === "therapist") {
      return [
        { label: "Name", path: "name" },
        { label: "Email", path: "email" },
        { label: "Massage type", path: "massageType" },
        { label: "Duration", path: "duration" },
        { label: "Therapist", path: "therapistName" },
        { label: "Contact number", path: "contactNumber" },
        { label: "Address", path: "address" },
        { label: "Date", path: "date" },
        { label: "Created by", path: "createdBy" },
        {
          label: "Status",
          key: "status",
          content: (item) => {
            const variant =
              item.status === "pending"
                ? "danger"
                : item.status === "ongoing"
                ? "warning"
                : item.status === "cancelled"
                ? "dark"
                : "success";
            return <Badge variant={variant}>{item.status}</Badge>;
          },
        },
        {
          key: "edit",
          content: (item) => (
            <Button variant="outline-info" onClick={() => handleShow(item.id)}>
              <FaEdit />
            </Button>
          ),
        },
      ];
    } else if (user.userType.name === "customer") {
      return [
        { label: "Name", path: "name" },
        { label: "Email", path: "email" },
        { label: "Massage type", path: "massageType" },
        { label: "Duration", path: "duration" },
        { label: "Therapist", path: "therapistName" },
        { label: "Contact number", path: "contactNumber" },
        { label: "Address", path: "address" },
        { label: "Date", path: "date" },
        {
          label: "Status",
          key: "status",
          content: (item) => {
            const variant =
              item.status === "pending"
                ? "danger"
                : item.status === "ongoing"
                ? "warning"
                : item.status === "cancelled"
                ? "dark"
                : "success";
            return <Badge variant={variant}>{item.status}</Badge>;
          },
        },
        {
          key: "edit",
          content: (item) => {
            if (checkStatus(item))
              return (
                <Tooltip
                  variant="outline-info"
                  message="can't update because session is ongoing"
                  icon={FaEdit}
                  component={Button}
                />
              );
            return (
              <Button
                variant="outline-info"
                onClick={() => handleShow(item.id)}
              >
                <FaEdit />
              </Button>
            );
          },
        },
        {
          key: "delete",
          content: (item) => {
            if (checkStatus(item))
              return (
                <Tooltip
                  variant="outline-danger"
                  message="can't delete because session is ongoing"
                  icon={FaTrashAlt}
                  component={Button}
                />
              );
            return (
              <Button
                variant="outline-danger"
                onClick={() => handleDelete(item.id)}
              >
                <FaTrashAlt />
              </Button>
            );
          },
        },
      ];
    } else {
      return [
        { label: "Name", path: "name" },
        { label: "Email", path: "email" },
        { label: "Massage type", path: "massageType" },
        { label: "Duration", path: "duration" },
        { label: "Therapist", path: "therapistName" },
        { label: "Contact number", path: "contactNumber" },
        { label: "Address", path: "address" },
        { label: "Date", path: "date" },
        { label: "Created by", path: "createdBy" },
        {
          label: "Status",
          key: "status",
          content: (item) => {
            const variant =
              item.status === "pending"
                ? "danger"
                : item.status === "ongoing"
                ? "warning"
                : item.status === "cancelled"
                ? "dark"
                : "success";
            return <Badge variant={variant}>{item.status}</Badge>;
          },
        },
        {
          key: "edit",
          content: (item) => {
            if (checkStatus(item))
              return (
                <Tooltip
                  variant="outline-info"
                  message="can't update because session is ongoing"
                  icon={FaEdit}
                  component={Button}
                />
              );
            return (
              <Button
                variant="outline-info"
                onClick={() => handleShow(item.id)}
              >
                <FaEdit />
              </Button>
            );
          },
        },
        {
          key: "delete",
          content: (item) => {
            if (checkStatus(item))
              return (
                <Tooltip
                  variant="outline-danger"
                  message="can't delete because session is ongoing"
                  icon={FaTrashAlt}
                  component={Button}
                />
              );
            return (
              <Button
                variant="outline-danger"
                onClick={() => handleDelete(item.id)}
              >
                <FaTrashAlt />
              </Button>
            );
          },
        },
      ];
    }
  } else {
    return [];
  }
};

const checkStatus = (item) => {
  if (item.status === "ongoing") return true;
  return false;
};
