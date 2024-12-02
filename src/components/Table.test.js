import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "./Table";

describe("Table Component", () => {
  test("renders a 5x5 grid", () => {
    render(<Table robot={null} />);

    const cells = screen.getAllByRole("gridcell");
    expect(cells).toHaveLength(25);
  });

  test("renders the robot in the correct position with direction", () => {
    const robot = { position: { x: 2, y: 3 }, direction: "NORTH" };

    render(<Table robot={robot} />);

    const robotCell = screen.getByText("N");
    expect(robotCell).toBeInTheDocument();

    expect(robotCell).toHaveClass("robot-cell");
  });

  test("does not render robot when robot is null", () => {
    render(<Table robot={null} />);

    const robotCell = screen.queryByText(/^[NSEW]$/);
    expect(robotCell).not.toBeInTheDocument();
  });

  test("renders the correct robot direction initial", () => {
    const robot = { position: { x: 1, y: 1 }, direction: "WEST" };

    render(<Table robot={robot} />);

    const robotCell = screen.getByText("W");
    expect(robotCell).toBeInTheDocument();

    expect(robotCell.textContent).toBe("W");
  });

  test("robot cell has correct styling", () => {
    const robot = { position: { x: 4, y: 4 }, direction: "EAST" };

    render(<Table robot={robot} />);

    const robotCell = screen.getByText("E");
    expect(robotCell).toBeInTheDocument();

    expect(robotCell).toHaveClass("robot-cell");
  });
});
