import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Register } from "../../src/pages/";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationContext } from "../../src/contexts";
import { message } from "antd";

vi.mock("antd", async () => {
  const originalAntd = await vi.importActual("antd");
  return {
    ...originalAntd,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
    Typography: {
      ...originalAntd.Typography,
      Title: originalAntd.Typography.Title,
    },
  };
});

describe("Register Component Tests", () => {
  let mockRegister = vi.fn();

  beforeEach(() => {
    mockRegister.mockReset();
    render(
      <BrowserRouter>
        <AuthenticationContext.Provider value={{ register: mockRegister }}>
          <Register />
        </AuthenticationContext.Provider>
      </BrowserRouter>,
    );
  });

  it("renders registration page with all elements", () => {
    expect(screen.getByPlaceholderText("Username")).toBeDefined();
    expect(screen.getByPlaceholderText("Password")).toBeDefined();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeDefined();
    expect(
      screen.getAllByRole("button", { name: /register/i })[0],
    ).toBeDefined();
    expect(screen.getByText("connexion")).toBeDefined();
  });

  it("shows validation messages for empty inputs", async () => {
    const registerButton = screen.getAllByRole("button", {
      name: /register/i,
    })[0];
    fireEvent.click(registerButton);

    await screen.findByText("Please input your username!");
    await screen.findByText("Please input your password!");
    await screen.findByText("Please confirm your password!");
  });

  it("handles successful registration", async () => {
    mockRegister.mockResolvedValueOnce();
    fireEvent.input(screen.getAllByPlaceholderText("Username")[0], {
      target: { value: "newUser" },
    });
    fireEvent.input(screen.getAllByPlaceholderText("Password")[0], {
      target: { value: "password123" },
    });
    fireEvent.input(screen.getAllByPlaceholderText("Confirm Password")[0], {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getAllByRole("button", { name: /register/i })[0]);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalled();
      expect(message.success).toHaveBeenCalledWith(
        "Tout est bien fait dans register",
      );
    });
  });

  it("handles registration failure", async () => {
    mockRegister.mockRejectedValueOnce(new Error("Registration failed"));
    fireEvent.input(screen.getAllByPlaceholderText("Username")[0], {
      target: { value: "newUser" },
    });
    fireEvent.input(screen.getAllByPlaceholderText("Password")[0], {
      target: { value: "password123" },
    });
    fireEvent.input(screen.getAllByPlaceholderText("Confirm Password")[0], {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getAllByRole("button", { name: /register/i })[0]);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalled();
      expect(message.error).toHaveBeenCalledWith(
        "Tout est mal fait dans register",
      );
    });
  });
});
