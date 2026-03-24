import { render, screen, fireEvent } from "@testing-library/react";
import WaterSafetyQuiz from "../components/WaterSafetyQuiz";
import { expect, test, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// Mock the API module
vi.mock("../services/api", () => ({
  getQuiz: vi.fn(() =>
    Promise.resolve([
      {
        id: 1,
        question_text: "What is the main job of a lifeguard?",
        options: ["Keep people safe", "Swim fast", "Blow whistles"],
        correct_answer: 0,
      },
      {
        id: 2,
        question_text: "Why are lifeguards important?",
        options: [
          "They respond to emergencies",
          "They eat snacks",
          "They sit on chairs",
        ],
        correct_answer: 0,
      },
      {
        id: 3,
        question_text: "Can you swim in a pool without a lifeguard?",
        options: ["Yes", "No"],
        correct_answer: 1,
      },
      {
        id: 4,
        question_text: "What's a safe way to rescue someone?",
        options: ["Reach or throw", "Jump in without thinking", "Ignore"],
        correct_answer: 0,
      },
      {
        id: 5,
        question_text: "How do you stay safe in water?",
        options: ["Stay afloat", "Swim under water constantly", "Dive deep"],
        correct_answer: 0,
      },
      {
        id: 6,
        question_text: "Emergency number to call?",
        options: ["911", "123", "000"],
        correct_answer: 0,
      },
      {
        id: 7,
        question_text: "Lifeguards can save lives?",
        options: ["Can save lives", "Cannot", "Maybe"],
        correct_answer: 0,
      },
      {
        id: 8,
        question_text: "How often to watch swimmers?",
        options: ["Constantly", "Sometimes", "Rarely"],
        correct_answer: 0,
      },
      {
        id: 9,
        question_text: "Should you wear sunscreen?",
        options: ["Sunscreen", "No sunscreen", "Optional"],
        correct_answer: 0,
      },
      {
        id: 10,
        question_text: "How to rest in water safely?",
        options: ["Rest and float", "Dive and swim", "Ignore safety"],
        correct_answer: 0,
      },
    ])
  ),
  getResources: vi.fn(() =>
    Promise.resolve([
      { id: 1, title: "Water Safety 101", url: "https://example.com", difficulty_level: 1 },
      { id: 2, title: "Advanced Safety", url: "https://example.com", difficulty_level: 3 },
    ])
  ),
}));

const renderWithRouter = (ui: React.ReactElement) =>
  render(ui, { wrapper: MemoryRouter });

test("renders first question", async () => {
  renderWithRouter(<WaterSafetyQuiz />);
  expect(await screen.findByText("What is the main job of a lifeguard?")).toBeInTheDocument();
});

test("progresses through quiz", async () => {
  renderWithRouter(<WaterSafetyQuiz />);

  const safeBtn = await screen.findByText("Keep people safe");
  fireEvent.click(safeBtn);

  expect(await screen.findByText("Why are lifeguards important?")).toBeInTheDocument();
});

test("shows results at end", async () => {
  renderWithRouter(<WaterSafetyQuiz />);

  // Completes the quiz
  fireEvent.click(await screen.findByText("Keep people safe")); //Q1
  fireEvent.click(await screen.findByText("They respond to emergencies")); //Q2
  fireEvent.click(await screen.findByText("No")); //Q3
  fireEvent.click(await screen.findByText("Reach or throw")); //Q4
  fireEvent.click(await screen.findByText("Stay afloat")); //Q5
  fireEvent.click(await screen.findByText("911")); //Q6
  fireEvent.click(await screen.findByText("Can save lives")); //Q7
  fireEvent.click(await screen.findByText("Constantly")); //Q8
  fireEvent.click(await screen.findByText("Sunscreen")); //Q9
  fireEvent.click(await screen.findByText("Rest and float")); //Q10

  // renders results
  expect(await screen.findByText(/Your score:/)).toBeInTheDocument();
});