import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/toaster";
import { BadgeProvider } from "./hooks/badgeContext.tsx";
import { UserProvider } from "./hooks/userContext.tsx";
import { RoleProvider } from "./hooks/roleContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <BadgeProvider>
          <RoleProvider>
            <App />
          </RoleProvider>
        </BadgeProvider>
      </UserProvider>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
