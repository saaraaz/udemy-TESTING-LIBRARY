import React, { useState } from "react";
import Container from "react-bootstrap/Container";

import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

import { OrderDetailsProvider } from "./contexts/OrderDetails";

export default function App() {
  // orderPhase needs to be 'inProgress', 'review' or 'completed'
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry; //default value of the page we want to display
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );
}

/* 
  App has a "orderPhase" state:
  1- if 'inProgress' >>> OrderEntry compo/page,
  2- if in 'review' >>> OrderSummary compo,
  3- 'complete' >>> OrderConfirmation page (New Order btn >> goes back to OrderEntery)
  >> any of these components, recieves the 'setOrderPhase' that is set when the btn on that page is clicked and takes the user to another page.
*/
