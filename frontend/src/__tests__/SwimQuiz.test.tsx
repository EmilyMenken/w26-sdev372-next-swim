import { render, screen, fireEvent } from "@testing-library/react";
import SwimQuiz from "../components/SwimQuiz";
import * as api from "../services/api";
import { expect, test, vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../services/api");

const mockQuizData = [
  {
    question_id: 1,
    question_text: "Which best describes your swimming ability?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"] // ✅ FIXED
  },
  {
    question_id: 2,
    question_text: "How confident do you feel in the water?",
    options: ["Not confident", "Somewhat confident", "Confident", "Very confident"] // ✅ FIXED
  }
];

test("renders first question", async () => {
  (api.getQuiz as any).mockResolvedValue(mockQuizData);
  (api.getResources as any).mockResolvedValue([]); // still needed

  render(<SwimQuiz />);

  expect(
    await screen.findByText("Which best describes your swimming ability?")
  ).toBeInTheDocument();
});

test("advances to next question on answer", async () => {
  (api.getQuiz as any).mockResolvedValue(mockQuizData);
  (api.getResources as any).mockResolvedValue([]);

  render(<SwimQuiz />);

  const btn = await screen.findByText("Beginner");
  fireEvent.click(btn);

  expect(
    await screen.findByText("How confident do you feel in the water?")
  ).toBeInTheDocument();
});