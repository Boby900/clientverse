import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BadgeProvider } from "@/hooks/badgeContext";

import { describe, it, expect, vi, beforeEach } from "vitest";
import EditCard from "@/pages/dashboard/EditCard";
import { UserProvider } from "@/hooks/userContext";
import { BrowserRouter } from "react-router";

// Mock useParams and useSearchParams
const mockUseParams = vi.fn();
const mockUseSearchParams = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: () => mockUseParams(),
    useSearchParams: () => mockUseSearchParams(),
  };
});

describe("EditCard Component", () => {
  const mockCardData = {
    status: "success",
    metadata: [
      {
        createdAt: "2025-02-04T03:49:33.803Z",
        id: 20,
        selectedFields: '["created","description","author"]',
        tableName: "collection_mango_cbf12f32-d8b1-4e0c-9fa8-dd5769ac1ed5",
        userId: "cbf12f32-d8b1-4e0c-9fa8-dd5769ac1ed5",
      },
    ],
    tableData: [
      {
        author: "author of outside",
        created: "2025-02-08 04:13:42.974532",
        description: "testing inside",
        id: "57c0977a-15fc-4b53-a475-c22b799fb5b8",
        userId: "cbf12f32-d8b1-4e0c-9fa8-dd5769ac1ed5",
      },
    ], // Add an empty metadata array
    message: "fetched collection successfully",
  };
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Set default mock implementations
    mockUseParams.mockReturnValue({ id: "123" });
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams({ tableName: "testTable" }),
    ]);

    // Mock fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCardData),
    });
  });

  it("renders demo text correctly", async () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <BadgeProvider>
            <EditCard />
          </BadgeProvider>
        </UserProvider>
      </BrowserRouter>
    );
    screen.debug(); // Print the rendered output to the console

    await waitFor(() => {
      expect(
        screen.getByText("collection_mango_cbf12f32-d8b1-4e0c-9fa8-dd5769ac1ed5")
      ).toBeInTheDocument(); // Assuming "Id" is a column header
    },
    {timeout: 5000}
  );
  await waitFor(() => {
    expect(
      screen.getByText(/A list of your recent data/)
    ).toBeInTheDocument();
  });
  });

  it("displays loading state while fetching data", async() => {
    global.fetch = vi
      .fn()
      .mockImplementationOnce(() => new Promise((resolve) => {
        setTimeout(() => {
          resolve({ status: 200, json: () => Promise.resolve({}) }); // Resolve with some data
        }, 100); // Resolve after 100ms
      })); // Never resolves
    render(
      <BrowserRouter>
        <UserProvider>
          <BadgeProvider>
            <EditCard />
          </BadgeProvider>
        </UserProvider>
      </BrowserRouter>
    );
    await waitFor(()=>{
      expect(screen.getByTestId("progressbar")).toBeInTheDocument(); 
    })
  
  });

  it("displays 'No data available' when tableData is empty", async () => {
    const emptyData = {
      status: "success",
      metadata: [
        {
          createdAt: "2025-02-04T03:49:33.803Z",
          id: 20,
          selectedFields: '["created","description","author"]',
          tableName: "collection_mango_cbf12f32-d8b1-4e0c-9fa8-dd5769ac1ed5",
          userId: "cbf12f32-d8b1-4e0c-9fa8-dd5769ac1ed5",
        },
      ],
      tableData: [], // Empty tableData
      message: "fetched collection successfully",
    };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(emptyData),
    });
  
    render(
      <BrowserRouter>
        <UserProvider>
          <BadgeProvider>
            <EditCard />
          </BadgeProvider>
        </UserProvider>
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("No data available")).toBeInTheDocument();
    });
  });
  
  it("toggles checkbox functionality", async () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <BadgeProvider>
            <EditCard />
          </BadgeProvider>
        </UserProvider>
      </BrowserRouter>
    );
  
    await waitFor(() => {
      const checkboxes = screen.getAllByRole("checkbox");
      const checkbox = checkboxes[0]; // Assuming the second checkbox is the one you want
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });
  
});
