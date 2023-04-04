/*
    this compo comprises a checkbox for the user to agree to Terms, and a confirm btn
*/

import { fireEvent, render, screen } from "@testing-library/react";
import { logRoles } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

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

test("confirm btn gets enabled w/ the checkbox", () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmBtn = screen.getByRole("button", { name: /confirm order/i });

  fireEvent.click(checkBox);
  expect(confirmBtn).toBeEnabled();

  fireEvent.click(checkBox);
  expect(confirmBtn).toBeDisabled();
});
