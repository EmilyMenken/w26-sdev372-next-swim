import { render, screen } from "@testing-library/react";
import Navbar from "../components/NavBar";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { expect, test } from "vitest";

test("renders navbar links", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  expect(screen.getByText("NextSwim")).toBeInTheDocument();
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Quiz")).toBeInTheDocument();
  expect(screen.getByText("Aquatic Resources")).toBeInTheDocument();
});