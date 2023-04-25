import { useState } from "react";
import Col from "react-bootstrap/Col";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function ScoopOption({ name, imagePath }) {
  //1- getting a 'setter' we need, form our 'context' file:
  const { updateItemCount } = useOrderDetails();
  // 2- check the context file to see watch params you should pass into this setter
  // >>> updateItemCount(itemName, newItemCount, optionType)

  //3- to make sure we get a correct number (bc user can put anything, negative, or 1.5 scoops, ...)
  const [isValid, setIsValid] = useState(true);
  const handleChange = (event) => {
    const currentValue = event.target.value;

    // make sure we're using a number and not a string to validate (bc spinbtn uses strings)
    const currentValueFloat = parseFloat(currentValue);
    const valueIsValid =
      0 <= currentValueFloat &&
      currentValueFloat <= 10 &&
      Math.floor(currentValueFloat) === currentValueFloat;

    // validate
    setIsValid(valueIsValid);

    // adjust scoop count with currentValue if it's valid; 0 if it's not
    const newValue = valueIsValid ? parseInt(currentValue) : 0;
    updateItemCount(name, newValue, "scoops");
  };

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
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}

/*
  sample option obj:
  {
  name: "Chocolate",
  imagePath: "/images/chocolate.png"
  }
  */
