import React from "react";
import Container from "react-bootstrap/Container";
// import OrderSummary from "./pages/summary/OrderSummary";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

export default function App() {
  // orderPhase needs to be 'inProgress', 'review' or 'completed'

  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
        {/* <OrderSummary /> */}
      </OrderDetailsProvider>
    </Container>
  );
}
