/*
    this compo comprises a checkbox for the user to agree to Terms, and a confirm btn
*/
import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SummaryForm() {
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  const checkboxLable = (
    <span>
      I agree to <span style={{ color: "blue" }}>terms and conditions</span>
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
