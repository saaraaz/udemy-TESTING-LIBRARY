import React from "react";
import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Button from "react-bootstrap/Button";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Design your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <br />
      <h2 style={{ textAlign: "center" }}>
        Grand total: {formatCurrency(totals?.scoops + totals?.toppings)}
      </h2>
      <Button onClick={() => setOrderPhase("review")}>Order Sundae!</Button>
    </div>
  );
}
