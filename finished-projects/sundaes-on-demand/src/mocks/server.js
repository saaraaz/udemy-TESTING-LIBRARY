import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);

/*
    next step (final): configure create-react app, 
    so that MSW will intercept(stop) the network requests,
    and return the responces that we stablished in our handlers.

    using the MSW docs, edit the setupTests.js
*/
