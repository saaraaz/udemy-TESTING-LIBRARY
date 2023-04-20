import { screen, render } from "../../../test-utils/TDL-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("updates scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);
  // render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });
  // ^^^ if we didn't have make a test-utils

  // * first we design a user fellow:

  // [user fellow 1]- make sure toatal starts out at $0.00

  const scoopsSubtotal = screen.getByText("Scoops total:", { exact: false });
  //^ It's a display el, so we use the text + The text should match exactly by default (see the dox for 'getByText'), but we need a partial match to be able to reuse it thruout the tests
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  // ^ 'toHaveTextContent' match is partial by default

  // [user fellow 2]- update vanilla scoops to 1 and check the new subtotal

  // - the input that gets the number of scoops for each option is called 'spinbutton'
  // - it'll only apear after the server call to get the scoopOptions is done (so you have to use 'await')
  //- The 'name option' would be the 'label' of the spinButton).
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  //- next step is to go to the dox (Testing Lib -> utility APIs) for the userEvent related to this element;
  //- *** but it's a good thing to always 'CLEAR' the element for both the test & code,
  //(just to be sure it would not e.g. put the cursour somewhere and you enter 1 but get 10 instead)
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1"); // we simulate that the user enters numebr 1 into the input
  expect(scoopsSubtotal).toHaveTextContent("2.00"); //each scoop is $2

  // [user fellow 3]- update chocolate scoops to 2 and check the new subtotal

  const chocolateInput = screen.getByRole("spinbutton", {
    name: "Chocolate",
  });
  // ^^^ this time we don't have to 'wait' since we know from previouse one that it's already loaded!

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00"); // 1*Vanilla + 2* Choco
});
//=======================================================================================================
test("updates topping subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // [user fellow 1]- make sure toatal starts out at $0.00
  const toppingsSubtotal = screen.getByText("Toppings total:", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // [user fellow 2]- update Cherries topping to be checked and assert the new subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  expect(cherriesCheckbox).not.toBeChecked();
  await user.click(cherriesCheckbox); //***
  expect(cherriesCheckbox).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("1.50"); //each scoop is $1.5

  // [user fellow 3]- update another topping to be checked and assert the new subtotal
  const mAndMsCheckbox = screen.getByRole("checkbox", {
    name: "M&Ms",
  });
  // ^^^ this time we don't have to 'wait' since we know from previouse one that it's already loaded!

  expect(mAndMsCheckbox).not.toBeChecked();
  await user.click(mAndMsCheckbox);
  expect(mAndMsCheckbox).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("3.00"); // $1.5 + $1.5

  // [user fellow 4]- remove the new topping ('un-check') and assert the new subtotal
  await user.click(mAndMsCheckbox);
  expect(mAndMsCheckbox).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("1.50"); // $3.00 - $1.5
});
//=======================================================================================================
describe("grand total", () => {
  /*
    using '.only' & '.skip' we figured this is the first test causes this warning: 
    Warning: An update to Options inside a test was not wrapped in act(...).
    Solution: 1)we have to explicitly 'umount' the compo before test finishes +
    2)add a 'cleanup' func to the compo that makes the network call (Options.jsx)
  */
  test("should start at $0.00", () => {
    //to make sure that we 'unmount' the compo before exiting: 1- deconstruct the 'unmount' func
    const { unmount } = render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });

    expect(grandTotal).toHaveTextContent("0.00");

    //2- and run it:
    unmount();
  });
  test("should update properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    const user = userEvent.setup();

    // *** the followings are 2 different axios calls, we have to await both of them:
    //update Vanilla scoop to 2 and check grand total:
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2"); // we simulate that the user enters numebr 1 into the input
    expect(grandTotal).toHaveTextContent("4.00"); //each scoop is $2

    //add a topping and check grand total:
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50"); // $4.00 + $1.50
  });

  test("should update properly if topping is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    const user = userEvent.setup();

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("should update properly if an item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    const user = userEvent.setup();

    // add Cherries, grand total should be $1.50
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    // *** ^ we don't need to assert again!

    // update Vanilla scoops to 2; grand total should be $5.50
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    // remove 1 scoop of Vanilla and check grand total
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    // check grand total
    expect(grandTotal).toHaveTextContent("3.50");

    // remove cherries and check grand total
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
