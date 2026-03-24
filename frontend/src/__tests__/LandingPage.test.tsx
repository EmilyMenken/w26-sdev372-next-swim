import { render, screen } from "@testing-library/react";
import Landing from "../pages/Landing";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";

test("renders landing content", () => {
  render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>
  );

  expect(screen.getByText("Welcome to NextSwim")).toBeInTheDocument();
  expect(screen.getByText(/NextSwim supports individuals/i)).toBeInTheDocument();
});