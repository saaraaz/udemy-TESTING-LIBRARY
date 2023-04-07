/*
    to create our handler for each rout:
    1- we check this part: WorkSpace/udemy-TESTING-LIBRARY/sundae-server
    to see how our server works
    2- we check the responce we should expect it to mock: sundae-options.json
*/

import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ])
    );
  }),
];
// ^^^ we make a fake objects that matches the real responces

// * next step (it's a one time thing): integrate -> 2 ways: 1) browser 2) Node
// * we use Node in this project => create the server.js file
