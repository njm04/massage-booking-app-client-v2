import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Card, Alert } from "react-bootstrap";
import _ from "lodash";
import { toast } from "react-toastify";
// TODO: get states/provinces data from backend instead of json file
import states from "../canadian-states.json";
import { loadUsers, getTherapistSchedules } from "../store/users";
import {
  getAppointmentById,
  editAppointment,
  isLoading,
} from "../store/appointments";
import { appointmentFormSchema } from "../validation/appointmentsValidationSchema";
import ReactDatePicker from "./common/reactDatePicker";
import Input from "./common/input";
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

let EditAppointmentForm = ({ appointmentId, therapists }, ref) => {
  // data from useSelector(getTherapists) is empty on the first render
  // for now im initializing the therapists data from the appointments table
  // const therapists = useSelector(getTherapists);
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const appointment = useSelector(getAppointmentById)(appointmentId);
  const defaultValues = {
    firstName: appointment.user.firstName,
    lastName: appointment.user.lastName,
    address: appointment.address,
    addressTwo: appointment.addressTwo,
    state: appointment.state,
    city: appointment.city,
    zip: appointment.zip,
    duration: appointment.duration,
    date: new Date(appointment.date),
    contactNumber: appointment.contactNumber,
    massageType: appointment.massageType,
    therapist: appointment.therapist._id,
  };
  const { register, handleSubmit, watch, errors, control } = useForm({
    resolver: yupResolver(appointmentFormSchema),
    defaultValues,
  });

  // watch value of province field and dynamically get city based on that
  const cities = getCities(watch("state"));
  const therapistId = watch("therapist");
  const schedules = useSelector(getTherapistSchedules)(therapistId);
  const [therapistSched, setTherapistSched] = useState(schedules);

  const handleChangeSchedules = () => {
    const therapist = therapists.find(
      (therapist) => therapist._id === therapistId
    );
    const schedules = therapist.reservations.map((schedule) => ({
      date: schedule.date,
      duration: schedule.duration,
    }));

    setTherapistSched(schedules);
  };

  useEffect(() => {
    dispatch(loadUsers());
    console.log("fired");
  }, [dispatch]);

  // TODO: make submit functional
  const onSubmit = (data) => {
    const payload = _.pick(data, [
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

    if (appointment.therapist._id !== payload.therapist)
      payload.prevTherapist = appointment.therapist._id;

    dispatch(editAppointment(appointment._id, payload));
    toast.success("Your appointment has been updated successfully");
  };

  /*
  a parent component that renders 
  <EditAppointmentForm ref={formRef} /> 
  would be able to invoke submit: () => handleSubmit(onSubmit)()
   */
  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(onSubmit)(),
  }));

  return (
    <Form id="hook-form" onSubmit={handleSubmit}>
      <fieldset disabled={loading}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <Card className="mt-3">
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
                        onChange={handleChangeSchedules}
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
                            disabled={false}
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
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </fieldset>
    </Form>
  );
};

EditAppointmentForm = forwardRef(EditAppointmentForm);
export default EditAppointmentForm;
