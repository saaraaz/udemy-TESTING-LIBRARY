import React, { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import Row from "react-bootstrap/Row";

export default function Options({ optionType }) {
  //the optionType will be either 'scoop' or 'toppings'

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((responce) => setItems(responce.data))
      .catch((error) => {
        //TODO: handel errors
      });
  }, [optionType]);

  // TODO: replace null with 'ToppingOption'
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
