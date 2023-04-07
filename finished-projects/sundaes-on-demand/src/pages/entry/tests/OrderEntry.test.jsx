import { screen, render, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

// 1st Step: we have to override our handlers for this test:
test("handels error for scoops and toppings routs", async () => {
  server.resetHandlers(
    rest.get("http://localhost3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  /* ***Race condition:

  const alerts = await screen.findAllByRole("alert");
  expect(alerts).toHaveLength(2);

  this test may fail depending on the speed of computer,
  bc we are awaiting 2 network calls, and the assertion may happen after just one!
  * solution: 'waitfor'
*/

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
// 2nd Step: create AlertBanner compo
