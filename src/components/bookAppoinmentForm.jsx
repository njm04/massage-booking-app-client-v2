import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Button, Card, Alert } from "react-bootstrap";
import { Redirect } from "@reach/router";
import _ from "lodash";
// TODO: get states/provinces data from backend instead of json file
import states from "../canadian-states.json";
import { getUser } from "../store/auth";
import { getTherapists, loadUsers } from "../store/users";
import { addAppointment, isLoading } from "../store/appointments";
import ReactDatePicker from "./common/reactDatePicker";
import Input from "./common/input";
import Spinner from "./common/spinner";
import { appointmentFormSchema } from "../validation/appointmentsValidationSchema";
import { concatName } from "../utils/utils";

const getCities = (abbreviation) => {
  const provAbbreviation = !abbreviation ? "AB" : abbreviation;
  return _.find(states, ["abbreviation", provAbbreviation]).cities;
};

const massageDuration = [
  // { massageDuration: 30, label: "30 minutes" },
  { massageDuration: 60, label: "60 minutes" },
  { massageDuration: 90, label: "90 minutes" },
  { massageDuration: 120, label: "120 minutes" },
];

const massageTypes = [
  "Whole body massage",
  "Head massage",
  "Foot massage",
  "Back massage",
];

const BookAppointmentForm = () => {
  const user = useSelector(getUser);
  const therapists = useSelector(getTherapists);
  const loading = useSelector(isLoading);
  const dispatch = useDispatch();
  const { firstName, lastName } = user;
  const [therapistSched, setTherapistSched] = useState([]);
  const defaultValues = {
    firstName: firstName,
    lastName: lastName,
    address: "",
    addressTwo: "",
    state: "AB",
    city: "Banff",
    zip: "",
    duration: 60,
    date: "",
    contactNumber: "",
    massageType: "Whole body massage",
    therapist: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(appointmentFormSchema),
    defaultValues,
  });

  const therapistId = watch("therapist");
  const getTherapistsSchedules = () => {
    const therapist = therapists.find(
      (therapist) => therapist._id === therapistId
    );
    const schedules = therapist.reservations.map((schedule) => ({
      date: schedule.date,
      duration: schedule.duration,
    }));

    setTherapistSched(schedules);
  };
  // watch value of province field and dynamically get city based on that
  const cities = getCities(watch("state"));

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isSubmitSuccessful) reset(defaultValues);
  }, [isSubmitSuccessful, reset, defaultValues, therapists]);

  const onSubmit = (data) => {
    const appointment = _.pick(data, [
      "address",
      "addressTwo",
      "city",
      "contactNumber",
      "date",
      "duration",
      "massageType",
      "state",
      "therapist",
      "zip",
    ]);
    dispatch(addAppointment(appointment));
  };

  if (user && user.userType && user.userType.name === "therapist")
    return <Redirect to="/" noThrow />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <Card className="mt-3">
                <Card.Header as="h2">Book an appointment</Card.Header>
                <Card.Body>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Input
                        name="firstName"
                        placeholder="Enter first name"
                        label="First Name"
                        register={register}
                        readOnly
                      />
                      {errors.firstName && (
                        <Alert variant="danger">
                          {errors.firstName.message}
                        </Alert>
                      )}
                    </Form.Group>

                    <Form.Group as={Col} controlId="lastName">
                      <Input
                        name="lastName"
                        placeholder="Enter last name"
                        label="Last Name"
                        register={register}
                        readOnly
                      />
                      {errors.lastName && (
                        <Alert variant="danger">
                          {errors.lastName.message}
                        </Alert>
                      )}
                    </Form.Group>
                  </Form.Row>

                  <Form.Group controlId="addressOne">
                    <Input
                      name="address"
                      placeholder="1234 Main St"
                      label="Address"
                      register={register}
                    />
                    {errors.address && (
                      <Alert variant="danger">{errors.address.message}</Alert>
                    )}
                  </Form.Group>

                  <Form.Group controlId="addressTwo">
                    <Input
                      name="addressTwo"
                      placeholder="Apartment, studio, or floor"
                      label="Address 2"
                      register={register}
                    />
                    {errors.addressTwo && (
                      <Alert variant="danger">
                        {errors.addressTwo.message}
                      </Alert>
                    )}
                  </Form.Group>

                  <Form.Row>
                    <Form.Group as={Col} controlId="state">
                      <Form.Label>State/Province</Form.Label>
                      <Form.Control as="select" name="state" ref={register}>
                        {states.map((state) => (
                          <option
                            value={state.abbreviation}
                            key={state.abbreviation}
                          >
                            {state.name}
                          </option>
                        ))}
                      </Form.Control>
                      {errors.state && (
                        <Alert variant="danger">{errors.state.message}</Alert>
                      )}
                    </Form.Group>
                    <Form.Group as={Col} controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control as="select" name="city" ref={register}>
                        {cities.map((city) => (
                          <option value={city} key={city}>
                            {city}
                          </option>
                        ))}
                      </Form.Control>
                      {errors.city && (
                        <Alert variant="danger">{errors.city.message}</Alert>
                      )}
                    </Form.Group>
                    <Form.Group as={Col} controlId="zip">
                      <Input name="zip" label="Zip" register={register} />
                      {errors.zip && (
                        <Alert variant="danger">{errors.zip.message}</Alert>
                      )}
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="therapist">
                      <Form.Label>Therapists</Form.Label>
                      <Form.Control
                        as="select"
                        name="therapist"
                        ref={register}
                        onChange={getTherapistsSchedules}
                      >
                        <option value="" disabled>
                          Select your therapist
                        </option>
                        {therapists.map((therapist) => (
                          <option value={therapist._id} key={therapist._id}>
                            {concatName(therapist)}
                          </option>
                        ))}
                      </Form.Control>
                      {errors.therapist && (
                        <Alert variant="danger">
                          {errors.therapist.message}
                        </Alert>
                      )}
                    </Form.Group>
                    <Form.Group as={Col} controlId="dateTime">
                      <Form.Label>Date/Time</Form.Label>
                      {/* validation not working */}
                      <Controller
                        control={control}
                        name="date"
                        render={(props) => (
                          <ReactDatePicker
                            disabled={!therapistId ? true : false}
                            schedules={therapistSched}
                            value={props.value}
                            onChange={props.onChange}
                          />
                        )}
                      />
                      {errors.dateTimePicker && (
                        <Alert variant="danger">
                          {errors.dateTimePicker.message}
                        </Alert>
                      )}
                    </Form.Group>
                    <Form.Group as={Col} controlId="duration">
                      <Form.Label>Duration</Form.Label>
                      <Form.Control as="select" name="duration" ref={register}>
                        {massageDuration.map((duration) => (
                          <option
                            value={duration.massageDuration}
                            key={duration.massageDuration}
                          >
                            {duration.label}
                          </option>
                        ))}
                      </Form.Control>
                      {errors.duration && (
                        <Alert variant="danger">
                          {errors.duration.message}
                        </Alert>
                      )}
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="massageType">
                      <Form.Label>Massage Type</Form.Label>
                      <Form.Control
                        as="select"
                        name="massageType"
                        ref={register}
                      >
                        {massageTypes.map((type) => (
                          <option value={type} key={type}>
                            {type}
                          </option>
                        ))}
                      </Form.Control>
                      {errors.massageType && (
                        <Alert variant="danger">
                          {errors.massageType.message}
                        </Alert>
                      )}
                    </Form.Group>
                    <Form.Group as={Col} controlId="contactNumber">
                      <Input
                        name="contactNumber"
                        label="Contact Number"
                        register={register}
                      />
                      {errors.contactNumber && (
                        <Alert variant="danger">
                          {errors.contactNumber.message}
                        </Alert>
                      )}
                    </Form.Group>
                  </Form.Row>
                  <Button variant="primary" type="submit">
                    {loading ? <Spinner /> : null}
                    <span>Submit</span>
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </fieldset>
    </Form>
  );
};

export default BookAppointmentForm;
