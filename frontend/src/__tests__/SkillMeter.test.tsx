import { render, screen } from "@testing-library/react"
import SkillMeter from "../components/SkillMeter"
import { describe, it, expect } from "vitest"

describe("SkillMeter", () => {
  it("calculates width correctly", () => {
    render(<SkillMeter label="Swimming" score={5} max={10} level="Intermediate" />)

    const bar = screen.getByTestId("skill-bar")
    expect(bar).toHaveStyle({ width: "50%" })
  })
})