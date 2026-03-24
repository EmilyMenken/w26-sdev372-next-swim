import { render, screen, waitFor } from "@testing-library/react";
import Resources from "../pages/resources";
import * as api from "../services/api";
import { expect, test, vi } from "vitest";

vi.mock("../services/api");

test("renders resources page", async () => {
  (api.getResources as any).mockResolvedValue([]);

  render(<Resources />);
  expect(screen.getByText("Swim Resource Library")).toBeInTheDocument();

  await waitFor(() => {
    expect(api.getResources).toHaveBeenCalled();
  });
});