import { render, screen } from "@testing-library/react";
import Landing from "../pages/Landing";
import "@testing-library/jest-dom";
import { expect, test } from "vitest";

test("renders landing content", () => {
  render(<Landing />);

  expect(screen.getByText("Welcome to NextSwim")).toBeInTheDocument();
  expect(screen.getByText(/NextSwim supports individuals/i)).toBeInTheDocument();
});