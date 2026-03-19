import { render, screen, fireEvent } from "@testing-library/react";
import SwimQuiz from "../components/SwimQuiz";
import * as api from "../services/api";
import { expect, test, vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../services/api");

test("renders first question", async () => {
  (api.getResources as any).mockResolvedValue([]);
  render(<SwimQuiz />);
  // Waits for the first question text to appear
  expect(await screen.findByText("Which best describes your swimming ability?")).toBeInTheDocument();
});

test("advances to next question on answer", async () => {
  (api.getResources as any).mockResolvedValue([]);
  render(<SwimQuiz />);
  
  const beginnerBtn = await screen.findByText("Beginner");
  fireEvent.click(beginnerBtn);
  
  expect(await screen.findByText("How confident do you feel in the water?")).toBeInTheDocument();
});