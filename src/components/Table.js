import React from "react";
const Table = ({ robot }) => {
  const grid = Array.from({ length: 5 }, (_, row) => Array.from({ length: 5 }, (_, col) => ({ x: col, y: 4 - row })));

  return (
    <div className="table" role="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="table-row">
          {row.map((cell) => (
            <div
              key={`${cell.x},${cell.y}`}
              role="gridcell"
              className={`table-cell ${robot && robot.position.x === cell.x && robot.position.y === cell.y ? "robot-cell" : ""}`}
            >
              {robot && robot.position.x === cell.x && robot.position.y === cell.y ? robot.direction[0] : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
