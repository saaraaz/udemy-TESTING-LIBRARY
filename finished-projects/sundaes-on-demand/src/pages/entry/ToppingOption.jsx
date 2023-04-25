import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function ToppingOption({ name, imagePath }) {
  //1- getting a 'setter' we need, form our 'context' file:
  const { updateItemCount } = useOrderDetails();
  // 2- check the context file to see watch params you should pass into this setter
  // >>> updateItemCount(itemName, newItemCount, optionType)
  const handleChange = (e) => {
    updateItemCount(name, e.target.checked ? 1 : 0, "toppings");
  };

  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  );
}
