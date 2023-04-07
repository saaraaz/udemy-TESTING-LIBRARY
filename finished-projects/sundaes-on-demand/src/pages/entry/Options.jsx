import React, { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";

export default function Options({ optionType }) {
  //the optionType will be either 'scoop' or 'toppings'

  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

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

  const optionItem = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItem}</Row>;
}

/*
    for handeling errors:
    1- we use 'alert' banner from bs, we first examine the bs sample to see the role, and
    2- bc our handlers return non-error codes, we have to override the handler for this test.
*/
