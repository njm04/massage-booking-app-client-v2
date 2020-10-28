import React, { useImperativeHandle, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Card } from "react-bootstrap";
import _ from "lodash";
import {
  getAppointmentById,
  isLoading,
  updateAppointmentStatus,
} from "../store/appointments";
import Input from "./common/input";
import { concatName } from "../utils/utils";
import moment from "moment";

let UpdateAppointmentStatusModal = ({ appointmentId }, ref) => {
  // data from useSelector(getTherapists) is empty on the first render
  // for now im initializing the therapists data from the appointments table
  // const therapists = useSelector(getTherapists);
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const appointment = useSelector(getAppointmentById)(appointmentId);
  const defaultValues = {
    customer: concatName(appointment.user),
    duration: appointment.duration + " minutes",
    date: moment(appointment.date).format("MMMM d, yyyy h:mm A"),
    contactNumber: appointment.contactNumber,
    massageType: appointment.massageType,
    therapist: appointment.therapist._id,
    status: appointment.status,
  };
  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    dispatch(updateAppointmentStatus(appointment._id, data));
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
                        name="customer"
                        label="Customer"
                        register={register}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Input
                        name="massageType"
                        label="Massage Type"
                        register={register}
                        disabled
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <Input
                        name="date"
                        label="Date/Time"
                        register={register}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Input
                        name="massageType"
                        label="Massage Type"
                        register={register}
                        disabled
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <Input
                        name="duration"
                        label="Duration"
                        register={register}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Status</Form.Label>
                      <Form.Control as="select" name="status" ref={register}>
                        <option value="pending">Pending</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </Form.Control>
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

UpdateAppointmentStatusModal = forwardRef(UpdateAppointmentStatusModal);
export default UpdateAppointmentStatusModal;
