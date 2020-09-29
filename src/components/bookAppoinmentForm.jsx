import React, { useState } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { setHours, setMinutes, addDays } from "date-fns";
import moment from "moment";

const BookAppointmentForm = () => {
  const options = { hour: "2-digit", minute: "2-digit" };
  const currentTime = new Date().toLocaleTimeString([], options);
  const now = moment(new Date());
  console.log(new Date().toLocaleString([]));
  console.log(moment().toLocaleString());
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  console.log(currentTime >= startDate.toLocaleTimeString([], options));
  return (
    <Form>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <Card className="mt-3">
              <Card.Body>
                <Form.Row>
                  <Form.Group as={Col} controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control placeholder="Enter first name" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder="Enter last name" />
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="addressOne">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group controlId="addressTwo">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                  </Form.Group>

                  <Form.Group as={Col} controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                      <option>Choose...</option>
                      <option value="BC">British Columbia</option>
                      <option value="AB">Alberta</option>
                      <option value="SK">Saskatchewan</option>
                      <option value="MB">Manitoba</option>
                      <option value="ON">Ontario</option>
                      <option value="QC">Quebec</option>
                      <option value="NB">New Brunswick</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="zip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                      <option>Choose...</option>
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="90">90 minutes</option>
                      <option value="120">120 minutes</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="dateTime">
                    <Form.Label>Date/Time</Form.Label>
                    <DatePicker
                      className="form-control"
                      selected={startDate}
                      onChange={(date) => {
                        // if (currentTime >= date.toLocaleTimeString([], options)) {

                        // }
                        setStartDate(date);
                      }}
                      includeDates={[
                        new Date(),
                        addDays(new Date(), 1),
                        addDays(new Date(), 2),
                        addDays(new Date(), 3),
                        addDays(new Date(), 4),
                      ]}
                      showTimeSelect
                      timeFormat="HH:mm"
                      injectTimes={[
                        setHours(setMinutes(new Date(), 1), 0),
                        setHours(setMinutes(new Date(), 5), 12),
                        setHours(setMinutes(new Date(), 59), 23),
                      ]}
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default BookAppointmentForm;
