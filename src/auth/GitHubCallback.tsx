import { useEffect } from "react";
import { useSearchParams } from "react-router";

const GitHubCallback = () => {
  const [searchParams] = useSearchParams();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const code = searchParams.get("code");
    // const state = searchParams.get("state");

    if (code) {
      // Send the code and state to the server
      fetch(`${apiUrl}/api/auth/github/login/callback`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ code, state }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("GitHub login failed");
          }
          return response.json();
        })
        .then((data) => {
          console.log("GitHub OAuth Success:", data);
          // Handle user data or navigate to a new page
        })
        .catch((error) => {
          console.error("Error during GitHub OAuth:", error);
          // Handle error (e.g., show a message to the user)
        });
    }
  }, [searchParams]);

  return <div>Processing GitHub login...</div>;
};

export default GitHubCallback;
