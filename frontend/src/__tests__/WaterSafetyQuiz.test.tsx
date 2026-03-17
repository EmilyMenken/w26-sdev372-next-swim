import { render, screen, fireEvent } from "@testing-library/react";
import WaterSafetyQuiz from "../components/WaterSafetyQuiz";
import "@testing-library/jest-dom";
import { expect, test } from "vitest";

test("renders first question", () => {
  render(<WaterSafetyQuiz />);
  expect(screen.getByText("What should you do if someone is drowning?")).toBeInTheDocument();
});

test("progresses through quiz", () => {
  render(<WaterSafetyQuiz />);
  fireEvent.click(screen.getByText("Reach or throw something to help"));

  expect(screen.getByText("Why is it important to swim with a buddy?")).toBeInTheDocument();
});

test("shows results at end", () => {
  render(<WaterSafetyQuiz />);
  fireEvent.click(screen.getByText("Reach or throw something to help"));
  fireEvent.click(screen.getByText("Someone can help in an emergency"));
  fireEvent.click(screen.getByText("Watch swimmers and respond to emergencies"));

  expect(screen.getByText(/Your score:/)).toBeInTheDocument();
});