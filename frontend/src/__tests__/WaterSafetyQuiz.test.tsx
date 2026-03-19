import { render, screen, fireEvent } from "@testing-library/react";
import WaterSafetyQuiz from "../components/WaterSafetyQuiz";
import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";

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
  fireEvent.click(await screen.findByText("Call 911")); //Q6
  fireEvent.click(await screen.findByText("Can save lives")); //Q7
  fireEvent.click(await screen.findByText("Constantly")); //Q8
  fireEvent.click(await screen.findByText("Sunscreen")); //Q9
  fireEvent.click(await screen.findByText("Rest and float")); //Q10

  // renders results
  expect(await screen.findByText(/Your score:/)).toBeInTheDocument();
});