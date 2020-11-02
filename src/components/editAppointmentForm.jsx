import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Card } from "react-bootstrap";
import _ from "lodash";
// TODO: get states/provinces data from backend instead of json file
import states from "../canadian-states.json";
import { loadUsers, getTherapistSchedules } from "../store/users";
import {
  getAppointmentById,
  editAppointment,
  isLoading,
} from "../store/appointments";
import { getUser } from "../store/auth";
import {
  concatName,
  getCities,
  createDefaultValues,
  handleChangeSchedules,
} from "../utils/utils";
import { massageDuration, massageTypes } from "../constants";
import { appointmentsSchema } from "../validation/validationSchemas";
import ReactDatePicker from "./common/reactDatePicker";
import Input from "./common/input";
import Error from "./common/error";

let EditAppointmentForm = ({ appointmentId, therapists }, ref) => {
  // data from useSelector(getTherapists) is empty on the first render
  // for now im initializing the therapists data from the appointments table
  // const therapists = useSelector(getTherapists);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const loading = useSelector(isLoading);
  const appointment = useSelector(getAppointmentById)(appointmentId);
  const condition =
    user &&
    user.userType &&
    user.userType.name === "admin" &&
    appointment.createdBy._id === user._id;
  const defaultValues = createDefaultValues(user, appointment);
  const { register, handleSubmit, watch, errors, control } = useForm({
    resolver: yupResolver(appointmentsSchema(user)),
    defaultValues,
  });

  // watch value of province field and dynamically get city based on that
  const cities = getCities(watch("state"));
  const therapistId = watch("therapist");
  const schedules = useSelector(getTherapistSchedules)(therapistId);
  const [therapistSched, setTherapistSched] = useState(schedules);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const onSubmit = (data) => {
    const payload = _.pick(data, [
      "firstName",
      "lastName",
      "email",
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
                        readOnly={condition ? false : true}
                      />
                      {errors.firstName && (
                        <Error message={errors.firstName.message} />
                      )}
                    </Form.Group>

                    <Form.Group as={Col} controlId="lastName">
                      <Input
                        name="lastName"
                        placeholder="Enter last name"
                        label="Last Name"
                        register={register}
                        readOnly={condition ? false : true}
                      />
                      {errors.lastName && (
                        <Error message={errors.lastName.message} />
                      )}
                    </Form.Group>

                    <Form.Group as={Col} controlId="email">
                      <Input
                        name="email"
                        placeholder="Enter email"
                        label="Email"
                        register={register}
                        readOnly={condition ? false : true}
                      />
                      {errors.email && <Error message={errors.email.message} />}
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
                      <Error message={errors.address.message} />
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
                      <Error message={errors.addressTwo.message} />
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
                      {errors.state && <Error message={errors.state.message} />}
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
                      {errors.city && <Error message={errors.city.message} />}
                    </Form.Group>
                    <Form.Group as={Col} controlId="zip">
                      <Input name="zip" label="Zip" register={register} />
                      {errors.zip && <Error message={errors.zip.message} />}
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="therapist">
                      <Form.Label>Therapists</Form.Label>
                      <Form.Control
                        as="select"
                        name="therapist"
                        ref={register}
                        onChange={() =>
                          handleChangeSchedules(
                            therapistId,
                            therapists,
                            setTherapistSched
                          )
                        }
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
                        <Error message={errors.therapist.message} />
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
                      {errors.date && <Error message={errors.date.message} />}
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
                        <Error message={errors.duration.message} />
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
                        <Error message={errors.massageType.message} />
                      )}
                    </Form.Group>
                    <Form.Group as={Col} controlId="contactNumber">
                      <Input
                        name="contactNumber"
                        label="Contact Number"
                        register={register}
                      />
                      {errors.contactNumber && (
                        <Error message={errors.contactNumber.message} />
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
