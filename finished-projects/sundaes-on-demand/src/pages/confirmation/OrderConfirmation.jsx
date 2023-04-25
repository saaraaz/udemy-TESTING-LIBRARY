import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderConfirmation({ setOrderPhase }) {
  // ^^ gets a setter from the App

  const [orderNumber, setOrderNumber] = useState(null);
  const { resetOrder } = useOrderDetails();

  useEffect(() => {
    // in a real app we'd get order details from context and send w/ POST
    axios
      .post("http://localhost:3030/order")
      .then((responce) => {
        setOrderNumber(responce.data.orderNumber);
      })
      .catch((error) => {
        // TODO: handel error}
      });
  }, []);
  // ^^ runs one time only when compo mounts

  function handleClick() {
    //clear the order details
    resetOrder();

    //send back to OrderEntry page
    setOrderPhase("inProgress");
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thanks you!</h1>
        <p>Your Order# {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          as per out terms and conditions nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading ...</div>;
  }
}
