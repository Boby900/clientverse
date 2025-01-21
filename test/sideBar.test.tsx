import { BadgeProvider } from "@/hooks/badgeContext";
import Sidebar from "@/pages/dashboard/Sidebar";
import { fireEvent, render, screen } from "@testing-library/react";
import { UserProvider } from "@/hooks/userContext";
import { BrowserRouter } from "react-router";
import { vi } from "vitest";
const mockNavigate = vi.fn();
vi.mock("react-router", async ()=>{
    const actual = await vi.importActual("react-router");
    return{
        ...actual,
        useNavigate: ()=> mockNavigate
    }
})

test("calls logout and navigates to home", async () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <BadgeProvider>
            <Sidebar />
          </BadgeProvider>
        </UserProvider>
      </BrowserRouter>
    );
  
    const trigger = screen.getByTestId("logout");
    fireEvent.click(trigger);
    const avatar = await screen.findByTestId("avatar");
    expect(avatar).toBeInTheDocument();

  });  

test("calls handleCollectionsClick when clicking on collections", () => {
    render(
        <BrowserRouter>
          <UserProvider>
            <BadgeProvider>
              <Sidebar />
            </BadgeProvider>
          </UserProvider>
        </BrowserRouter>
      );    const collectionsButton = screen.getByTestId("collections");
  
    fireEvent.click(collectionsButton);
    // Assuming you use a mock navigate function
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard/collections");
  });
  

test("renders demo text correctly", async () => {
  render(
    <BrowserRouter>
      <UserProvider>
        <BadgeProvider>
          <Sidebar />
        </BadgeProvider>
      </UserProvider>
    </BrowserRouter>
  );
  const text = screen.getByText(
    "This is a demo of Clientverse admin dashboard. The database resets every hour. Realtime data and file upload are disabled."
  );
  expect(text).toBeInTheDocument();
});

test("renders all navigation links", () => {
    render(
        <BrowserRouter>
        <UserProvider>
          <BadgeProvider>
            <Sidebar />
          </BadgeProvider>
        </UserProvider>
      </BrowserRouter>
    );
    const homeLink = screen.getByTitle("Home");
    const collectionsButton = screen.getByTestId("collections");
    const logsLink = screen.getByTitle("Logs");
    const settingsLink = screen.getByTitle("Settings");
  
    expect(homeLink).toBeInTheDocument();
    expect(collectionsButton).toBeInTheDocument();
    expect(logsLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
  });
  
