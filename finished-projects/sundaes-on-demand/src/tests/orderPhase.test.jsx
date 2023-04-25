// ** these are the 'overarching' tests that target the App compo, so we put them on a top-level folder.

// - This is a "functional" test!!!
// - Happy Path: a customer goes thru the whole flow with no issue
// - first we need to add a new 'handler' to our Mock services to mimic the post order network call in our 'server'

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// * all the user flow goes inside this one test block:
test("order phases for happy path", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<App />); // (Don't need to wrap in provider; already wrapped!)

  //   // eslint-disable-next-line testing-library/no-debugging-utils
  //   screen.debug();

  // add scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1"); //$2

  const chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" }); //* don't need to 'await findBy' again, it's already checked
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2"); //$4

  //* need to 'await findBy', it's a differnt call to another rout:
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  // find and click "order" btn
  const Orderbtn = screen.getByRole("button", { name: /order sundae/i });
  await user.click(Orderbtn); //>>> This should take the user to the "OrderSummary" page

  // check order summary subtotal based on order
  const summaryHeading = screen.getByRole("heading", {
    name: /order summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopSubtotsl = screen.getByRole("heading", {
    name: /Scoops subtotal/i,
  });
  expect(scoopSubtotsl).toHaveTextContent("6.00");

  const toppingSubtotsl = screen.getByRole("heading", {
    name: /Toppings subtotal/i,
  });
  expect(toppingSubtotsl).toHaveTextContent("1.50");

  // check summary option items
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  //** alternatively...
  //   const optionItems = screen.getAllByRole('listitem');
  //   const optionItemsText = optionItems.map((item) => item.textContent);
  //   expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries']);

  // accept terms and condition & click btn to confirm order
  const tcCheckBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(tcCheckBox);

  const confirmBtn = screen.getByRole("button", { name: /confirm order/i });
  await user.click(confirmBtn); //>>> This should take the user to the "OrderConfirmation" page

  // Expect "loading" to show, before getting to the "OrderConfirmation" page
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();
  // ^^ the newer version of MSW are too fast, to fix: add a 'sleep' func to the top of the "handlers.js" and delay the responce of "/order"

  // confirm order number on confirmation page
  // this one is async because there is a POST request to server in between "OrderSummary" & "OrderConfirmation" pages
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  // expect that loading has disappeared
  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();
  //   expect(orderNumber).toEqual("123455676"); //?????????? (based on our mocks > handlers.js)

  // find and click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderButton);

  // check that scoops and toppings have been "reset"
  const scoopsTotal = await screen.findByText("Scoops subtotal: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings subtotal: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  // To avoid 'Race Conditions' explicitly unmount component to trigger network call cancellation on cleanup
  unmount();
});
