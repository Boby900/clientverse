import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/toaster";
import { BadgeProvider } from "./hooks/badgeContext.tsx";
import { UserProvider } from "./hooks/userContext.tsx";
import { RoleProvider } from "./hooks/roleContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostHogProvider} from 'posthog-js/react'

const options = {
  api_host: import.meta.env.VITE_APP_PUBLIC_POSTHOG_HOST!,
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
     <PostHogProvider 
      apiKey={import.meta.env.VITE_APP_PUBLIC_POSTHOG_KEY!}
      options={options}
    >
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
    </PostHogProvider>
  </StrictMode>
);
