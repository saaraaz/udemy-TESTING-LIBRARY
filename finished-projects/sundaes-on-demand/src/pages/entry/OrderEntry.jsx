import React from "react";
import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderEntry() {
  const { totals } = useOrderDetails();

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Design your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <br />
      <h2 style={{ textAlign: "center" }}>
        Grand total: {formatCurrency(totals.scoops + totals.toppings)}
      </h2>
    </div>
  );
}
