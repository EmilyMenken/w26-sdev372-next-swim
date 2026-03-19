import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddResource from "../components/AddResource";
import * as api from "../services/api";
import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("../services/api");

describe("AddResource", () => {
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn();
  });

  test("renders form inputs", () => {
    render(<AddResource onSuccess={mockOnSuccess} />);

    expect(screen.getByPlaceholderText("Resource Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("URL (https://...)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add to nextswim/i })).toBeInTheDocument();
  });

  test("updates input fields", () => {
    render(<AddResource onSuccess={mockOnSuccess} />);

    const input = screen.getByPlaceholderText("Resource Title");
    fireEvent.change(input, { target: { value: "Test Title" } });

    expect(input).toHaveValue("Test Title");
  });

  test("submits successfully", async () => {
    (api.addResource as any).mockResolvedValue({});

    render(<AddResource onSuccess={mockOnSuccess} />);

    fireEvent.change(screen.getByPlaceholderText("Resource Title"), { target: { value: "Test Title" } });
    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Desc" } });
    fireEvent.change(screen.getByPlaceholderText("URL (https://...)"), { target: { value: "https://test.com" } });

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(api.addResource).toHaveBeenCalled();
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining("successfully"));
    });
  });

  test("handles API error", async () => {
    (api.addResource as any).mockRejectedValue(new Error());

    render(<AddResource onSuccess={mockOnSuccess} />);

    fireEvent.change(screen.getByPlaceholderText("Resource Title"), { target: { value: "Test Title" } });
    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Desc" } });
    fireEvent.change(screen.getByPlaceholderText("URL (https://...)"), { target: { value: "https://test.com" } });

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining("Error"));
    });
  });
});