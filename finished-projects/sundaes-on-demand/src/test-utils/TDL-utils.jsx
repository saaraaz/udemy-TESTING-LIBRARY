// Step1- import the method you want to 'override':
import { render } from "@testing-library/react";

// Step2- import the wrapper I'd need:
import { OrderDetailsProvider } from "../contexts/OrderDetails";

// Step3- make the custom render that you want to 'export':
const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// Step4- 're-export' everything (bc we might wanna use some other methods in our tests):
export * from "@testing-library/react";

// Step5- but 'override' the render method:
export { renderWithContext as render };
// ^ (if we ever wnated to use the actual 'render' in a test, we can easily import it ther.)

// Step 6- go to all the files that use this method and change it, e.g. 'OrderEntry.test.jsx'
