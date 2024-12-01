export const isValidCommand = (command) => {
  const validCommands = ["PLACE", "MOVE", "LEFT", "RIGHT", "REPORT"];
  const [baseCommand] = command.split(" ");
  return validCommands.includes(baseCommand);
};

export const isValidPlaceCommand = (command) => {
  const match = command.match(/^PLACE (\d),(\d),(NORTH|SOUTH|EAST|WEST)$/);
  if (!match) return false;

  const x = parseInt(match[1], 10);
  const y = parseInt(match[2], 10);

  return x >= 0 && x <= 4 && y >= 0 && y <= 4;
};
