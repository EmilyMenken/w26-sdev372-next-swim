import { render, screen, fireEvent } from "@testing-library/react";
import Quiz from "../pages/quiz";
import * as api from "../services/api";
import { expect, test, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("../services/api");

const mockQuizData = [
  {
    question_id: 1,
    question_text: "Which best describes your swimming ability?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"]
  }
];

test("renders quiz selection", () => {
  render(
    <MemoryRouter>
      <Quiz />
    </MemoryRouter>
  );
  expect(screen.getByText("NextSwim Quizzes")).toBeInTheDocument();
});

test("loads swim quiz", async () => {
  // Mocks the async API calls used in SwimQuiz
  (api.getQuiz as any).mockResolvedValue(mockQuizData);
  (api.getResources as any).mockResolvedValue([]);

  render(
    <MemoryRouter>
      <Quiz />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText("Swim Level Analysis"));

  // Waits for the first question to appear
  expect(
    await screen.findByText("Which best describes your swimming ability?")
  ).toBeInTheDocument();
});