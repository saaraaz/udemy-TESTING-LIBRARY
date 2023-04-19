import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails;

  // to get something like "3 Vanilla" (based on the mock-up):
  const scoopArray = Object.entries(optionCounts.scoops); // [ ["chocolate", 2], ["vanilla, 1"] ]
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  // for toppings, user can choose only one of each!
  const toppingArray = Object.keys(optionCounts.toppings); // ["M&Ms", "Gummi bears"]
  const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>OrderSummary: </h1>
      <h2>Scoops subtotal: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings subtotal: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
      <h1>
        Total {formatCurrency(totals.scoops) + formatCurrency(totals.toppings)}
      </h1>
      <SummaryForm />
    </div>
  );
}

/*
Mock-up:

OrderSummary: 
Scoops subtotal: $6
 - 3 Vanilla

Toppings subtotal: $4.50
 - M&Ms
 - Hot fudge
 - Gummi bears


Total $10.50
*/
