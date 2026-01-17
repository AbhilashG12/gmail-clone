import { render, screen } from "@testing-library/react"; 
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Inbox from "../components/Inbox";
import { useEmailStore } from "../store/useEmailStore";
import { type Email } from "../data/emails"; 

vi.mock("react-virtuoso", () => ({
  Virtuoso: ({ data, itemContent }: { data: Array<{ id: string }>; itemContent: (index: number, item: unknown) => React.ReactNode }) => (
    <div data-testid="virtuoso-list">
      {data.map((item, index) => (
        <div key={item.id}>{itemContent(index, item)}</div>
      ))}
    </div>
  ),
}));

const mockEmails: Email[] = [
  {
    id: "1",
    sender: "React Team",
    senderEmail: "react@react.dev",
    subject: "React 19 is coming",
    body: "Check out the new compiler...",
    isRead: false,
    isStarred: false,
    date: new Date().toISOString(),
    label: "inbox", 
    category: "primary"
  },
  {
    id: "2",
    sender: "Boss",
    senderEmail: "boss@corp.com",
    subject: "Meeting updates",
    body: "Please join at 10am",
    isRead: true,
    isStarred: true, 
    date: new Date().toISOString(),
    label: "inbox",
    category: "social"
  },
];

const renderInbox = (initialRoute = "/mail/inbox") => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/mail/:folder" element={<Inbox />} />
        <Route path="/mail/:folder/:emailId" element={<div>Detail View</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Inbox Feature", () => {
  beforeEach(() => {
    useEmailStore.setState({ emails: mockEmails });
    vi.clearAllMocks();
  });

  it("renders emails based on the URL folder", () => {
    renderInbox("/mail/inbox");
    expect(screen.getByText("React 19 is coming")).toBeInTheDocument();
    expect(screen.getByText("Meeting updates")).toBeInTheDocument();
    expect(screen.getByText("Inbox")).toBeInTheDocument();
  });

  it("filters emails based on URL (Starred)", () => {
    renderInbox("/mail/starred");
    expect(screen.getByText("Meeting updates")).toBeInTheDocument();
    expect(screen.queryByText("React 19 is coming")).not.toBeInTheDocument();
    expect(screen.getByText("Starred")).toBeInTheDocument();
  });

  // --- FIX APPLIED HERE ---
  it("selects an email when checkbox is clicked", async () => {
    const user = userEvent.setup();
    renderInbox();

    // Index 0 is "Select All" (Header)
    // Index 1 is the first email (Row)
    const checkboxes = screen.getAllByRole("checkbox");
    
    // Click the FIRST EMAIL checkbox (Index 1)
    await user.click(checkboxes[1]);

    // Use a regex matcher to be safe against whitespace like "1\n Selected"
    expect(screen.getByText(/1 Selected/i)).toBeInTheDocument();

    const row = checkboxes[1].closest("div[class*='relative']");
    expect(row?.parentElement).toHaveClass("bg-blue-50/50");
  });

  it("selects all emails when 'Select All' is clicked", async () => {
    const user = userEvent.setup();
    renderInbox();

    const allCheckboxes = screen.getAllByRole("checkbox");
    const selectAllCheckbox = allCheckboxes[0]; 

    await user.click(selectAllCheckbox);

    // Expect 2 because we have 2 mock emails
    expect(screen.getByText(/2 Selected/i)).toBeInTheDocument();
  });

  it("supports keyboard navigation (j/k/x)", async () => {
    const user = userEvent.setup();
    renderInbox();

    await user.keyboard("j");
    expect(screen.getByText("React 19 is coming").closest("div[class*='relative']"))
      .toHaveClass("z-20"); 

    await user.keyboard("j");
    expect(screen.getByText("Meeting updates").closest("div[class*='relative']"))
      .toHaveClass("z-20");

    await user.keyboard("x");
    expect(screen.getByText(/1 Selected/i)).toBeInTheDocument();

    await user.keyboard("k");
    expect(screen.getByText("React 19 is coming").closest("div[class*='relative']"))
      .toHaveClass("z-20");
  });

  it("navigates to detail view on Enter key", async () => {
    const user = userEvent.setup();
    renderInbox();

    await user.keyboard("j");
    await user.keyboard("{Enter}");

    expect(screen.getByText("Detail View")).toBeInTheDocument();
  });

  it("navigates to detail view on Click", async () => {
    const user = userEvent.setup();
    renderInbox();

    await user.click(screen.getByText("React 19 is coming"));

    expect(screen.getByText("Detail View")).toBeInTheDocument();
  });
});