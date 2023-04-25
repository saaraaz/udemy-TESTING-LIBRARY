import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails;
  console.log("optionCounts From OrderSummary>>>", optionCounts); //undefined????
  console.log("totals From OrderSummary>>>", totals); //undefined??????

  // to get something like "3 Vanilla" (based on the mock-up):
  const scoopArray = Object.entries(optionCounts?.scoops || []); // [ ["chocolate", 2], ["vanilla, 1"] ]
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  // for toppings, user can choose only one of each!
  // only display toppings if the toppings total is nonzero
  const hasToppings = totals?.toppings > 0;
  let toppingsDisplay = null;

  if (hasToppings) {
    const toppingsArray = Object.keys(optionCounts?.toppings || []); // ["M&Ms", "Gummi bears"]
    const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);
    toppingsDisplay = (
      <>
        <h2>Toppings subtotal: {formatCurrency(totals?.toppings) || 0}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops subtotal: {formatCurrency(totals?.scoops) || 0}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}

/*
Mock-up:
=======

OrderSummary: 
Scoops subtotal: $6
 - 3 Vanilla

Toppings subtotal: $4.50
 - M&Ms
 - Hot fudge
 - Gummi bears


Total $10.50

checkbox: I agree to (popOver)Terms and Conditions
btn: Confirm Order

*/
