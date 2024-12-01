const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];

export const isValidPlace = (x, y) => x >= 0 && x <= 4 && y >= 0 && y <= 4;

export const placeRobot = (x, y, f) => {
  if (!isValidPlace(x, y) || !DIRECTIONS.includes(f)) return null;
  return { position: { x, y }, direction: f };
};

export const moveRobot = ({ position, direction }) => {
  const { x, y } = position;
  let newPosition = { ...position };

  switch (direction) {
    case "NORTH": newPosition.y += 1; break;
    case "SOUTH": newPosition.y -= 1; break;
    case "EAST": newPosition.x += 1; break;
    case "WEST": newPosition.x -= 1; break;
    default: return null;
  }

  return isValidPlace(newPosition.x, newPosition.y)
    ? { position: newPosition, direction }
    : { position, direction };
};

export const rotateRobot = (currentDirection, turn) => {
  const index = DIRECTIONS.indexOf(currentDirection);
  const newIndex = (turn === "LEFT")
    ? (index - 1 + DIRECTIONS.length) % DIRECTIONS.length
    : (index + 1) % DIRECTIONS.length;

  return DIRECTIONS[newIndex];
};

export const reportRobot = ({ position, direction }) =>
  `${position.x},${position.y},${direction}`;
