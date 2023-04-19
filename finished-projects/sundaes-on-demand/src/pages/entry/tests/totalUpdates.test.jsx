import { screen, render } from "../../../test-utils/TDL-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

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
  // - it'll only apear after the server call to get the scoppOptins is done (so you have to use 'await')
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

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00"); // 1*Vanilla + 2* Choco
});
