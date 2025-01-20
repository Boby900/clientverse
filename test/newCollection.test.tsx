import { NewCollection } from "@/pages/dashboard/NewCollection";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import { BadgeProvider } from "@/hooks/badgeContext";
test("renders user data correctly", async () => {
  render(
    <BadgeProvider>
      <NewCollection  />
    </BadgeProvider>
  );

    // const fireEvent = document.getElementById("plus-icon")?.addEventListener("click", ()=>{

    // })
    // Find the Plus icon button
  const plusIcon = screen.getByTestId("plus-icon");
  // Assert that the Plus icon is in the document
  expect(plusIcon).toBeInTheDocument();
  // Assert that the dialog text "Make a new collection" is visible
  userEvent.click(
    screen.getByText('Make a new collection'))

  const dialogText = await screen.findByText("Make a new collection");
  expect(dialogText).toBeInTheDocument();
  // Simulate a click event on the Plus icon to open the dialog
  // fireEvent.click(plusIcon);
    // Assert that the dialog is not visible initially
    expect(screen.getByTestId("plus-icon")).toBeInTheDocument();

});
