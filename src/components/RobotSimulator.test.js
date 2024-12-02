import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RobotSimulator from "./RobotSimulator";

describe("RobotSimulator", () => {
  test("renders the RobotSimulator component", () => {
    render(<RobotSimulator />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("container", { name: /simulator/i })).toBeInTheDocument();
  });


  test("displays an error for invalid commands", () => {
    render(<RobotSimulator />);

    const commandsInput = screen.getByRole("textbox");
    const runButton = screen.getByRole("button", { name: /run/i });

    fireEvent.change(commandsInput, { target: { value: "INVALID_COMMAND" } });
    fireEvent.click(runButton);

    expect(screen.getByRole("error")).toHaveTextContent('Invalid command: "INVALID_COMMAND"');
  });
});
