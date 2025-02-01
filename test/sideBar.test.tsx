import { BadgeProvider } from "@/hooks/badgeContext";
import Sidebar from "@/pages/dashboard/Sidebar";
import { render, screen } from "@testing-library/react";
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

  

  });
  
