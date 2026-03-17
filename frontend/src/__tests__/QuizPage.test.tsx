import { render, screen, fireEvent } from "@testing-library/react";
import Quiz from "../pages/quiz";
import "@testing-library/jest-dom";
import { expect, test } from "vitest";

test("renders quiz selection", () => {
  render(<Quiz />);
  expect(screen.getByText("NextSwim Quizzes")).toBeInTheDocument();
});

test("loads swim quiz", () => {
  render(<Quiz />);
  fireEvent.click(screen.getByText("Swim Level Analysis"));

  expect(screen.getByText("Which best describes your swimming ability?")).toBeInTheDocument();
});