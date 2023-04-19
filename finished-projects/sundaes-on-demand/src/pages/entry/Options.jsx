import React, { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";
import { pricePerOption } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function Options({ optionType }) {
  //the optionType will be either 'scoop' or 'toppings'

  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();
  //^^^ we used one of our 'getters' from the 'contex' file here,
  //* in the next step: we use one of our 'setters' in the ScoopOption.jsx

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((responce) => setItems(responce.data))
      .catch((error) => setError(true));
  }, [optionType]);

  // 3rd Step: modify error handling in Options compo:
  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1); //e.g. "Scoops"

  const optionItem = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerOption[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItem}</Row>
    </>
  );
}

/*
    for handeling errors:
    1- we use 'alert' banner from bs, we first examine the bs sample to see the role, and
    2- bc our handlers return non-error codes, we have to override the handler for this test.
*/
