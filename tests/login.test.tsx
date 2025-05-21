import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../app/(auth)/login/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signInWithOAuth: jest.fn(),
    },
  },
}));

describe("LoginPage", () => {
  it("renders login form", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("switches to sign-up form", () => {
    render(<LoginPage />);

    const toggleButton = screen.getByRole("button", { name: /criar conta/i });
    fireEvent.click(toggleButton);

    expect(screen.getByRole("button", { name: /cadastrar/i })).toBeInTheDocument();
  });

  it("handles Google login", async () => {
    const { supabase } = require("@/lib/supabaseClient");
    supabase.auth.signInWithOAuth.mockResolvedValueOnce({});

    render(<LoginPage />);

    const googleButton = screen.getByRole("button", { name: /entrar com google/i });
    fireEvent.click(googleButton);

    expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: { redirectTo: expect.any(String) },
    });
  });

  it("handles Facebook login", async () => {
    const { supabase } = require("@/lib/supabaseClient");
    supabase.auth.signInWithOAuth.mockResolvedValueOnce({});

    render(<LoginPage />);

    const facebookButton = screen.getByRole("button", { name: /entrar com facebook/i });
    fireEvent.click(facebookButton);

    expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: "facebook",
      options: { redirectTo: expect.any(String) },
    });
  });
});
