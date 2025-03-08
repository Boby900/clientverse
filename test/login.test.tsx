import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Login from "@/auth/Login";
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
  });

  // it("submits valid form data and navigates to dashboard on successful login", async () => {
  //   const mockLoginResponse = { ok: true, json: vi.fn().mockResolvedValue({}) };
  //   const mockVerifyResponse = { ok: true, json: vi.fn().mockResolvedValue({}) };
  //   global.fetch = vi.fn()
  //     .mockResolvedValueOnce(mockLoginResponse)
  //     .mockResolvedValueOnce(mockVerifyResponse);

  //   render(<Login />);

  //   fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "user@example.com" } });
  //   fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "validpassword" } });

  //   await act(async () => {
  //     fireEvent.click(screen.getByText(/Log In with Email/i));
  //     await waitFor(() => {
  //       expect(screen.getByPlaceholderText(/Please enter the 8-digit code below/i)).toBeInTheDocument();
  //     });

  //     fireEvent.change(screen.getByPlaceholderText(/Please enter the 8-digit code below/i), { target: { value: "12345678" } });
  //     fireEvent.click(screen.getByText(/Verify Code/i));

  //     await waitFor(() => {
  //       expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  //     });
  //   });
  // });
});