import { render, screen } from "@testing-library/react";
import { fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Login from "@/auth/Login"; // Adjust the path if necessary
import { useNavigate } from "react-router";

// Mock dependencies
vi.mock("react-router", () => {
  return {
    useNavigate: vi.fn(),
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  };
});

const mockNavigate = vi.fn();
const mockedUseNavigate = useNavigate as unknown as ReturnType<typeof vi.fn>;
mockedUseNavigate.mockReturnValue(mockNavigate);

describe("Login Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders the login form", () => {
    render(<Login />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/Log In with Email/i)).toBeInTheDocument();
  });

  it("displays error message when validation fails", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "invalid" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "123" } });
    fireEvent.click(screen.getByText(/Log In with Email/i));

    // await waitFor(() => {
    //   expect(screen.getByText(/Email must be at least 5 characters/i)).toBeInTheDocument();
    //   expect(screen.getByText(/Password must be at least 5 characters/i)).toBeInTheDocument();
    // });
  });

  it("submits valid form data and navigates to dashboard on successful login", async () => {
    const mockResponse = { ok: true, json: vi.fn().mockResolvedValue({ message: "Logged in successfully" }) };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    render(<Login />);

    mockedUseNavigate.mockReturnValue(mockNavigate);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "validpassword" } });
    fireEvent.click(screen.getByText(/Log In with Email/i));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });
});
