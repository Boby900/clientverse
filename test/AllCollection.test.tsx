import { BadgeProvider } from "@/hooks/badgeContext";
import { render, screen } from "@testing-library/react";
import { UserProvider } from "@/hooks/userContext";
import { BrowserRouter } from "react-router";
import { vi } from "vitest";
import AllCollection from "@/pages/dashboard/AllCollection";

// Mock useFetchCollections globally
vi.mock("@/lib/utils", async (importOriginal) => {
  const original = await importOriginal() as Record<string, unknown>;
  return {
    ...original,
    useFetchCollections: vi.fn(() => ({
      loading: false, // Change to false for other states
      data: [
        {
          id: "1",
          tableName: "Collection 1",
          selectedFields: ["Field 1", "Field 2"],
        },
      ],
      pagination: { totalPages: 1 },
      currentPage: 1,
      handlePrevious: vi.fn(),
      handleNext: vi.fn(),
      handleDelete: vi.fn(),
      handlePageChange: vi.fn(),
    })),
  };
});

test("initial when loading is set to false", () => {
  render(
    <BrowserRouter>
      <UserProvider>
        <BadgeProvider>
          <AllCollection />
        </BadgeProvider>
      </UserProvider>
    </BrowserRouter>
  );

//   const text = screen.getByText("Loading collections...");
//   expect(text).toBeInTheDocument();
  // Verify data rendering
  const tableName = screen.getByText("Collection 1");
  expect(tableName).toBeInTheDocument();

  const selectedField = screen.getByText("Field 1");
  expect(selectedField).toBeInTheDocument();
});
