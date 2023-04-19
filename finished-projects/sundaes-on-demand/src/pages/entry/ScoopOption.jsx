import React from "react";
import Col from "react-bootstrap/Col";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function ScoopOption({ name, imagePath }) {
  /*
  sample option obj:
  {
  name: "Chocolate",
  imagePath: "/images/chocolate.png"
  }
  */

  //1- getting a 'setter' we need form our 'context' file:
  const { updateOptionCounts } = useOrderDetails();
  // 2- check the context file to see watch params you should pass into this setter
  // >>> updateOptionCounts(anOptionName, anOptionCount, anOptionType)
  const handleChange = (e) =>
    updateOptionCounts(name, parseInt(e.target.value), "scoops");
  // ^^ use parseInt() just to be sure the input is a number

  return (
    //if the screen is small, I want the image get the whole row!
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`} // we MUST have a 'ctrlId for each option, should be uniqu!
        as={Row} //for styling: how to arrange this
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        {/* this Col is just for styling: */}
        <Col xs="5" style={{ textAlign: "left" }}>
          {/* this is the actual 'input': */}
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
