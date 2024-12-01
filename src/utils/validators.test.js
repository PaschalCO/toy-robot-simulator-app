import { isValidCommand, isValidPlaceCommand } from "../utils/validators";

describe("isValidCommand", () => {
  it("should return true for valid commands", () => {
    expect(isValidCommand("PLACE 1,2,NORTH")).toBe(true);
    expect(isValidCommand("MOVE")).toBe(true);
    expect(isValidCommand("LEFT")).toBe(true);
    expect(isValidCommand("RIGHT")).toBe(true);
    expect(isValidCommand("REPORT")).toBe(true);
  });

  it("should return false for invalid commands", () => {
    expect(isValidCommand("INVALIDCOMMAND")).toBe(false);
    expect(isValidCommand("PLACE123")).toBe(false);
    expect(isValidCommand("MOVERIGHT")).toBe(false);
  });
});

describe("isValidPlaceCommand", () => {
  it("should return true for valid PLACE commands", () => {
    expect(isValidPlaceCommand("PLACE 0,0,NORTH")).toBe(true);
    expect(isValidPlaceCommand("PLACE 4,4,SOUTH")).toBe(true);
    expect(isValidPlaceCommand("PLACE 2,3,EAST")).toBe(true);
    expect(isValidPlaceCommand("PLACE 3,1,WEST")).toBe(true);
  });

  it("should return false for invalid PLACE commands", () => {
    expect(isValidPlaceCommand("PLACE -1,0,NORTH")).toBe(false);
    expect(isValidPlaceCommand("PLACE 5,5,SOUTH")).toBe(false);
    expect(isValidPlaceCommand("PLACE 2,3,UP")).toBe(false);  // Invalid direction
    expect(isValidPlaceCommand("PLACE 0,0")).toBe(false);  // Missing direction
    expect(isValidPlaceCommand("PLACE 3,3,NORTHWEST")).toBe(false);  // Invalid direction
  });
});