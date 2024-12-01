import React, { useState } from "react";
import { placeRobot, moveRobot, rotateRobot, reportRobot } from "../utils/robotLogic";
import { isValidCommand, isValidPlaceCommand } from "../utils/validators";
import Controls from "./Controls";
import Table from "./Table";

const RobotSimulator = () => {
  const [robot, setRobot] = useState(null);
  const [output, setOutput] = useState("");
  const [commands, setCommands] = useState("");
  const [error, setError] = useState("");

  const executeCommands = (commandsArray) => {
    let currentRobot = robot;
    let finalOutput = "";

    commandsArray.forEach((cmd) => {
      if (!isValidCommand(cmd)) {
        setError(`Invalid command: "${cmd}"`);
        return;
      }

      const parts = cmd.split(" ");
      const command = parts[0];

      switch (command) {
        case "PLACE":
          if (isValidPlaceCommand(cmd)) {
            const [x, y, f] = parts[1].split(",");
            currentRobot = placeRobot(parseInt(x, 10), parseInt(y, 10), f);
            setError("");
          } else {
            setError(`Invalid PLACE command: "${cmd}"`);
          }
          break;

        case "MOVE":
          if (currentRobot) {
            currentRobot = moveRobot(currentRobot);
          }
          break;

        case "LEFT":
        case "RIGHT":
          if (currentRobot) {
            currentRobot = {
              ...currentRobot,
              direction: rotateRobot(currentRobot.direction, command),
            };
          }
          break;

        case "REPORT":
          if (currentRobot) {
            finalOutput = reportRobot(currentRobot);
          }
          break;

        default:
          console.warn(`Unexpected command: ${cmd}`);
      }
    });

    setRobot(currentRobot);
    setOutput(finalOutput);
  };

  const handleRun = () => {
    setError("");
    const commandsArray = commands.split("\n").map((cmd) => cmd.trim());
    executeCommands(commandsArray);
  };

  return (
    <div className="robot-simulator">
      <h1>Toy Robot Simulator</h1>
      <div className="simulator-container">
        <Table robot={robot} />

        <Controls
          commands={commands}
          setCommands={setCommands}
          handleRun={handleRun}
        />
      </div>
      {output && <p className="output">Output: {output}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RobotSimulator;
