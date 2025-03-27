import { render, screen } from "@testing-library/react";
import Header from "@/components/header";
import "@testing-library/jest-dom";
import { UserProvider } from "@/components/registrationcontext";

describe("Header Component", () => {
  it("renders the Home link", () => {
    render(
      <UserProvider> {/* Wrap the Header with UserProvider */}
        <Header />
      </UserProvider>
    );
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument(); // Check if Home link is rendered
  });

  it("renders the Map link", () => {
    render(
      <UserProvider> {/* Wrap the Header with UserProvider */}
        <Header />
      </UserProvider>
    );
    const mapLink = screen.getByText(/Map/i);
    expect(mapLink).toBeInTheDocument(); // Check if Map link is rendered
  });
});
