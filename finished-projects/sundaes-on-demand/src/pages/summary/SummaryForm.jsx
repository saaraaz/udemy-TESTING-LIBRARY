/*
    this compo comprises a checkbox for the user to agree to Terms, and a confirm btn
*/
import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export default function SummaryForm() {
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);

  // This next part is taken from Bootstrap doc:

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delievered!</Popover.Body>
    </Popover>
  );

  const checkboxLable = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={checkBoxChecked}
          onChange={(e) => setCheckBoxChecked(e.target.checked)}
          label={checkboxLable}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!checkBoxChecked}>
        Confirm Order
      </Button>
    </Form>
  );
}
