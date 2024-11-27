import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Login } from "../../src/pages";
import { AuthenticationContext } from "../../src/contexts";

vi.mock("react-router-dom", async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    namedExport: vi.fn(),
  };
});

describe("Login Component", () => {
  let mockLogin = vi.fn();

  beforeEach(() => {
    mockLogin.mockReset();

    render(
      <BrowserRouter>
        <AuthenticationContext.Provider value={{ login: mockLogin }}>
          <Login />
        </AuthenticationContext.Provider>
      </BrowserRouter>,
    );
  });

  it("renders login page with all elements", () => {
    expect(screen.getByPlaceholderText("Username")).toBeDefined();
    expect(screen.getByPlaceholderText("Password")).toBeDefined();
    expect(screen.getByRole("button", { name: /log in/i })).toBeDefined();
    expect(screen.getByText("Inscription")).toBeDefined();
  });

  it("shows validation messages for empty inputs", async () => {
    let loginButton = screen.getAllByRole("button", { name: /Log in/i });
    loginButton = loginButton[0];

    fireEvent.click(loginButton);

    await screen.findByText("Please input your username!");
    await screen.findByText("Please input your password!");

    expect(mockLogin).not.toHaveBeenCalled();
  });
});
