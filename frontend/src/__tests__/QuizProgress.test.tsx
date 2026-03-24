import { render, screen } from "@testing-library/react";
import QuizProgress from "../components/ProgressBar";
import { expect, test } from "vitest";

test("renders correct progress text", () => {
  render(<QuizProgress current={2} total={8} />);
  expect(screen.getByText("2 / 8 Questions")).toBeInTheDocument();
});

test("calculates correct width", () => {
  render(<QuizProgress current={4} total={8} />);
  const bar = document.querySelector(".quiz-progress-fill") as HTMLElement;
  expect(bar.style.width).toBe("50%");
});