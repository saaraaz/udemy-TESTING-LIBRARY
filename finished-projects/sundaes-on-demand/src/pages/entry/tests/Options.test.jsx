import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  //^ to pass this test, we only need to code the 'image' element!
  render(<Options optionType="scoops" />);
  /*
    ^ we render this component here,
    and it is the one that makes the requests to the 'server',
    that's why we don't need to import MSW here.
*/

  //test to see if it finds images:
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  // ^ here, the role is 'img' and the "name option" for images is the AltText (we assume all of our altTexts END with 'scoop')
  // step1: test that we have the right number of images (so we refer to our 'handler' to see how many we mocked)
  expect(scoopImages).toHaveLength(2);

  //To make dbl sure, confirm altText of images:
  const altText = scoopImages.map((el) => el.alt); //gives us an array of AltTexes
  //for arrays and obects we use "toEqual" instead of "toBe"
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
