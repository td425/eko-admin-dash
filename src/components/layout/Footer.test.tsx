import { render, screen } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Footer from "./Footer";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={createTheme()}>{children}</ThemeProvider>
);

describe("Footer", () => {
  it("renders the infrastructure credit", () => {
    render(<Footer />, { wrapper });
    expect(screen.getByText(/designed and developed by/i)).toBeTruthy();
  });

  it("highlights Tamimah", () => {
    render(<Footer />, { wrapper });
    expect(screen.getByText("Tamimah")).toBeTruthy();
  });

  it("accepts an optional logoSrc prop without rendering an image", () => {
    render(<Footer logoSrc="./custom-logo.png" />, { wrapper });
    expect(document.querySelector("img")).toBeNull();
  });
});
