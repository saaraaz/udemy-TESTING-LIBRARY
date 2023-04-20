/*
these compnents will use this "context": OrderEntry & OrderSummary
*/

import { createContext, useContext, useState } from "react";
import { pricePerOption } from "../constants";

//step1: create a context
//-------------------------
const OrderDetails = createContext(); // the value of this func is an obj, w/ the 'getters' & 'setters' for the internal state.
// ^ but we leave the initial 'value' empty here, bc we want it to be 'undefine' if we're not inside a 'provider'

//step2: create a custom hook
//-----------------------------
// this just checks to see if we're inside a 'provider' and just then will retun the 'context value'
//(bc whenevr we are in a 'provider' we give it a 'value', so the value would NOT be 'undefined')
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);
  //^ when we use useContext() on a 'context', it returns the 'value' for that 'context' based on the 'provider' that we're within.

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an useOrderDetailsProvider!"
    );
  }
  //otherwise:
  return contextValue;
}

//step3: create the provider
//-----------------------------

export function OrderDetailsProvider(props) {
  //^^ it takes some'props' bc it's actually a 'functional compo' & and it returns the 'Provider' of the 'context' obj

  //step4: create whatever that we should put in 'value' (based on what info we need to save and track)
  //((e.g. [[the main goal of the 'context' here is to store 'OrderDetails']] i.e. the number and the type of each 'option' a customer picks))
  //-----------------------------
  // So,

  // step4-1, we store that in a piece of 'state'
  //-----------------------------
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // e.g. {Chocolate: 1, Vanilla: 2}
    toppings: {},
  });
  // ^^^ 'optionCounts' would be the 'getter'

  // step4-2, create the 'setter'
  //-----------------------------
  function updateOptionCounts(anOptionName, anOptionCount, anOptionType) {
    //1- make a copy of current state:
    const newOptionCounts = { ...optionCounts };

    //2- update the copy w/ the new info recieved:
    newOptionCounts[anOptionType][anOptionName] = anOptionCount;
    //e.g. the customer adds a 'topping' called Gummy Bear:
    // newOptionCounts[topping]["Gummy Bear"] = 1;

    //3- update the 'state' w/ the new copy:
    setOptionCounts(newOptionCounts);
  }

  // step4-3, create other usefull functions that the global context may need
  //-----------------------------

  //4-3-1- a 'reset order' functionality:
  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  //4-3-2- a utility function to get the current order 'total':
  function calculateTotal(anOptionType) {
    //1- get an array of all the 'counts' of an obj (either a 'scoop' obj or a 'topping')
    const countsArr = Object.values(optionCounts[anOptionType]); //e.g. for 'scoops' > [1,2]

    //2- get the 'total' of the 'counts' of either the 'scoops' or the 'toppings'
    const totalCount = countsArr.reduce((total, curr) => total + curr, 0);

    //3- Multiply the 'total count' of either the 'scoops' or the 'toppings' by their 'price'
    return totalCount * pricePerOption[anOptionType];
  }

  //4-3-3- get the 'totals' of the whole order:

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };
  // ^^^ and this is another 'getter'

  //----------------------------------------------------------------------------
  const value = { optionCounts, totals, updateOptionCounts, resetOrder };
  // ^^ the 'value' would be those 'getter & setters' (+ any data/functionality that we might pass along) that we'll create within this provider func here.

  return <OrderDetails.Provider value={value} {...props} />;
}

//*** Next step: use this contex in code >>>
// 1- import the 'provider' into >> App.js (wrap the OrderEntry) >>>
// 2- import the 'costum hook' into >> Options.jsx */
// 3- for the Test: since we're rendering the Option compo in isolation, we have to provide a 'wrapper' for it
