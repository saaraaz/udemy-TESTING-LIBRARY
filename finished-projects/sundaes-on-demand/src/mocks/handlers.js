/*
    to create our handler:
    1- we check this part: WorkSpace/udemy-TESTING-LIBRARY/sundae-server
    to see how our server works
    2- we check the responce we should expect it to mock: sundae-options.json
*/

import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          //we make a fake obc that matches the real responces
          name: "Chocolate",
          imagePath: "/images/chocolate.png",
        },
        {
          name: "Vanilla",
          imagePath: "/images/vanilla.png",
        },
      ])
    );
  }),
];

// * next step: integrate -> 2 ways: 1) browser 2) Node
// * we use Node in this project => creta the server.js file
