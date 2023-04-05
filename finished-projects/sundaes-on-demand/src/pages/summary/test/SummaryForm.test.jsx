/*
    this compo comprises a checkbox for the user to agree to Terms, and a confirm btn
*/

import { getByText, render, screen } from "@testing-library/react";
import { logRoles } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("just to get the roles", () => {
  // destructure a container, to see all your 'roles':
  const { container } = render(<SummaryForm />);
  // this conlose logs all the roles:
  logRoles(container);
});

test("Initial conditions", () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkBox).not.toBeChecked();

  const confirmBtn = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmBtn).toBeDisabled();
});

test("confirm btn gets enabled w/ the checkbox", async () => {
  // set up the user-event:
  const user = userEvent.setup();

  render(<SummaryForm />);
  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmBtn = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkBox);
  //* if you do not use await, the "assertion" might happen before the event had a chance to complete!S
  expect(confirmBtn).toBeEnabled();

  await user.click(checkBox);
  expect(confirmBtn).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  /*
    how we figure the test? we check the popover from bootstrap dox and examples,
    we 'inspect' the page and we figure that it's not 'hidden' by dispaly,
    but it's actually NOT on the page,
    so we go to the 'cheatsheet' doc table =>
    what we want is 'No Match'-> 'queryBy'
  */
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delievered!/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsText = screen.getByText(/terms and conditions/i);
  await user.hover(termsText);

  const termsPopover = screen.getByText(
    /no ice cream will actually be delievered!/i
  );
  expect(termsPopover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsText);
  expect(termsPopover).not.toBeInTheDocument();
});
