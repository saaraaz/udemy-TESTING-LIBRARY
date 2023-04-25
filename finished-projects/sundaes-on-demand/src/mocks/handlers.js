/*
    to create our handler for each rout:
    1- we check this part: WorkSpace/udemy-TESTING-LIBRARY/sundae-server
    to see how our server works
    2- we check the responce we should expect it to mock: sundae-options.json
*/

import { rest } from "msw";

//to make a deliberate delay in a call to see the 'loading' status
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

  // ^^^ we make fake objects that matches the real responces

  rest.post("http://localhost:3030/order", async (req, res, ctx) => {
    // add a 100ms pause here to give jest a chance to see the "loading" state.
    // See https://www.udemy.com/course/react-testing-library/learn/lecture/36703860

    await sleep(100);
    return res(ctx.json({ orderNumber: 123455676 }));
  }),
];

// * next step (it's a one time thing): integrate -> 2 ways: 1) browser 2) Node
// * we use Node in this project => create the server.js file
