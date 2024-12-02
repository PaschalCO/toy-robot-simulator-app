import { render, screen, fireEvent } from "@testing-library/react";
import Controls from "./Controls";

// Mock function for handleRun
const mockHandleRun = jest.fn();

describe("Controls Component", () => {
  it("renders the Controls component", () => {
    render(<Controls commands="" setCommands={() => {}} handleRun={mockHandleRun} />);

    expect(screen.getByPlaceholderText(/Enter commands here.../i)).toBeInTheDocument();
    expect(screen.getByText(/Run Commands/i)).toBeInTheDocument();
  });

  it("should update commands when typing in the textarea", () => {
    const setCommandsMock = jest.fn();
    render(<Controls commands="" setCommands={setCommandsMock} handleRun={mockHandleRun} />);

    const textarea = screen.getByPlaceholderText(/Enter commands here.../i);
    fireEvent.change(textarea, { target: { value: "Test command" } });

    expect(setCommandsMock).toHaveBeenCalledWith("Test command");
  });

  it("should call handleRun when the button is clicked", () => {
    render(<Controls commands="" setCommands={() => {}} handleRun={mockHandleRun} />);

    const button = screen.getByText(/Run Commands/i);
    fireEvent.click(button);

    expect(mockHandleRun).toHaveBeenCalledTimes(1);
  });

  it("should display the current commands in the textarea", () => {
    render(<Controls commands="Initial command" setCommands={() => {}} handleRun={mockHandleRun} />);

    const textarea = screen.getByPlaceholderText(/Enter commands here.../i);
    expect(textarea.value).toBe("Initial command");
  });
});
